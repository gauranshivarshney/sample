'use client';

import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { BsArrowDownCircle } from 'react-icons/bs'
import Message from './Message';

const Chat = ({ id }: { id: string }) => {
    const { data: session } = useSession()
    const userEmail = session?.user ? (session?.user?.email as string) : "unknown"
    const [messages] = useCollection(
        query(collection(db, "users", userEmail, "chats", id, "messages"), orderBy("createdAt", "asc"))
    )
    const bottomRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      if(bottomRef.current)
        bottomRef.current.scrollIntoView({behavior: "smooth"})
    }, [messages])
  return (
    <div className='max-w-3xl mx-auto'>
      {messages?.empty && (
        <div className='flex flex-col items-center gap-2 py-5'>
            <p>Type a prompt in below to get started!</p>
            <BsArrowDownCircle className='text-xl text-green-300 animate-bounce' />
        </div>
      )}
      {messages?.docs?.map((message, index) => (
        <div key={index}>
            <Message message={message?.data()} />
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

export default Chat
