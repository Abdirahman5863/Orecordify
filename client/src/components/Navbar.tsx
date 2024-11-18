
import React from 'react'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

// import { SigninButton } from './SiginButton'
 

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4  ' >
      {/* search bar */}
    
      <div className='flex gap-6  items-center justify-end w-full'>
         <Link href='/support' >
          <Image src={'/support.png'} alt='logo' width={30} height={30}/>
         </Link>
     <div>
     <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton 
  
        />
      </SignedIn>
        </div>
      </div>
       </div>
  )
}

export default Navbar