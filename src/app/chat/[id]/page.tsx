import React from 'react'
import ChatInput from '@/components/ChatInput'
import Chat from '@/components/Chat'

interface PageProps {
  params: {
    id: string
  }
}

const ChatPage = ({ params } : PageProps) => {
  const { id } = params;
  return (
    <div className='flex flex-col justify-center h-[100%] p-5 overflow-hidden'>
      <div className='flex-1 pt-10 overflow-y-scroll'>
        <Chat id={id} />
      </div>
      <ChatInput id={id} />
    </div>
  )
}

export default ChatPage
