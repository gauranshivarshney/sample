import ChatInput from '@/components/ChatInput';
import Chat from '@/components/Chat';

type PageProps = {
  params: {
    id: string;
  };
};

export default function ChatPage({ params }: PageProps) {
  const { id } = params;

  return (
    <div className='flex flex-col justify-center h-[100%] p-5 overflow-hidden'>
      <div className='flex-1 pt-10 overflow-y-scroll'>
        <Chat id={id} />
      </div>
      <ChatInput id={id} />
    </div>
  );
}