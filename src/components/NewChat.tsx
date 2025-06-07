'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const NewChat = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const userEmail = session?.user ? (session?.user?.email as string) : "unknown"
    const createNewChat = async() => {
      const doc = await addDoc(collection(db, "users", userEmail, "chats"),
    {
      userId: userEmail,
      createdAt: serverTimestamp()
    })
    router.push(`/chat/${doc?.id}`)
    }
  return (
    <div>
      <button onClick={createNewChat} className='flex items-center justify-center gap-2 w-full border border-white/20 text-xs md:text-base px-2 py-1 rounded-md text-white/50 hover:border-white/50 hover:text-white duration-300'>
        <FaPlus />
        New Chat
      </button>
    </div>
  )
}

export default NewChat
