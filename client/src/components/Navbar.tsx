
import React from 'react'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

// import { SigninButton } from './SiginButton'
 

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4  ' >
      {/* search bar */}
      <div className='rounded-full hidden md:flex  item-center ring-[1.5px] ring-gray-300 p-2 gap-2 text-xs'>
        <Image src={'/search.png'} alt='search' width={20} height={20}/>
        <input type="text" className='w-[200px] bg-transparent outline-none p-1 ' placeholder='Search....' />
      </div> 
      <div className='flex gap-6  items-center justify-end w-full'>
         <div >
          <Image src={'/bell.png'} alt='logo' width={20} height={20}/>
         </div>
     <div>
     <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
        </div>
      </div>
       </div>
  )
}

export default Navbar