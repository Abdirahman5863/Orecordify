
import React from 'react'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'

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
      <SignedIn >
      <Button className='text-white '>   <SignOutButton/></Button>
     
  
        
      </SignedIn>
        </div>
      </div>
       </div>
  )
}

export default Navbar