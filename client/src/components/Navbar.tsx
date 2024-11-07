
import React from 'react'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

// import { SigninButton } from './SiginButton'
 

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4  ' >
      {/* search bar */}
    
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