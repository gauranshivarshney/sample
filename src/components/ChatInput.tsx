'use client';

import React, { useState } from 'react'
import { TbPaperclip } from 'react-icons/tb'
import { ImArrowUpRight2 } from 'react-icons/im'
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import SelectionModel from './SelectionModel';

const ChatInput = ({ id } : { id: string }) => {
    const [prompt, setPrompt] = useState("")
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    //const model = "gpt-3.5-turbo"
    const { data: model } = useSWR("model", {
      fallbackData: "gpt-4-turbo"
    })
    const userEmail = session?.user ? (session?.user?.email as string) : "unknown"
    const userName = session?.user ? (session?.user?.email as string) : "unknown"

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(!prompt) return
      const input = prompt.trim()
      const message = {
        text: input,
        createdAt: serverTimestamp(),
        user: {
          _id: userEmail,
          name: userName,
          avatar:
            (session?.user?.image as string) || "https://i.ibb.co.com/XC0YX8v/avatar.o]png"
        }
      }
      try{
        setLoading(true)
        let charDocumentId = id
        if(!id){
          const docRef = await addDoc(collection(db, "users", userEmail, "chats"), {
            userId: userEmail,
            createdAt: serverTimestamp()
          });
          charDocumentId = docRef.id
          router.push(`/chat/${charDocumentId}`)
        }
        await addDoc(collection(db, "users", userEmail, "chats", charDocumentId as string, "messages"), message)
        setPrompt("")

        const notification = toast.loading("ChatGPT is thinking...")
        await fetch("/api/askchat", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            prompt: input,
            id: charDocumentId,
            model,
            session: userEmail
          })
        }).then(async(res) => {
          const data = await res.json()
          if(data?.success){
            toast.success(data?.message, {
              id: notification
            })
          }
          else{
            toast.error(data?.message, {
              id: notification
            })
          }
        })
      }
      catch(error){
        toast.error("Something went wrong. Please try again")
      }
      finally{
        setLoading(false)
      }
    }

  return (
    <div className='w-full flex flex-col items-center justify-center mx-auto pt-3 px-4'>
      <form onSubmit={sendMessage} className='bg-white/10 rounded-full flex items-center px-4 py-2.5 w-full'>
        <TbPaperclip className='text-2xl -rotate-45 text-white' />
        <input 
            type="text" 
            placeholder='Message ChatGPT' className='bg-transparent text-white placeholder:text-gray-400 px-3 outline-none w-full font-medium tracking-wide' 
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
        />
        <button type="submit" disabled={!prompt} className='p-2.5 rounded-full text-black bg-white disabled:bg-white/30'>
            <ImArrowUpRight2 className='text-sm -rotate-45 text-black/80 cursor-pointer' />
        </button>
      </form>
      <p className='text-xs mt-2 font-medium tracking-wide'>
        ChatGPT can make mistakes. Check important info.
      </p>
      <div className='w-full md:hidden mt-2'>
        <SelectionModel />
      </div>
    </div>
  )
}

export default ChatInput
