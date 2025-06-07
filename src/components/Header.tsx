import React from 'react'
import Link from 'next/link'
import { FiChevronDown } from 'react-icons/fi'
import { auth } from '@/auth'
import Image from 'next/image'
import SignOut from './SignOut'

const Header = async () => {
  const session = await auth()
  return (
    <div className='flex items-center justify-between m-2.5 h-10 absolute w-full top-0 left-0 pl-2 pr-12'>
      <button className='flex items-center gap-1 bg-[#2f2f2f] hover:bg-black font-semibold tracking-wide px-3 py-2 rounded-lg duraton-300'>ChatGPT <FiChevronDown /></button>
      {session?.user ? (
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full'>
            <Image src={session?.user?.image as string} alt='userImage' width={200} height={200} className='w-full h-full rounded-full object-cover' />
          </div>
          <SignOut />
        </div>
      ) : (
        <Link href={"/signin"} className='text-sm font-semibold hover:text-white duration-300'>Sign In</Link>
      )}
    </div>
  )
}

export default Header
