import Link from "next/link"
// import { SigninButton } from "./SiginButton"
import Image from "next/image"
import { SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs"
import { Button } from "./ui/button"

const Appbar = () =>{
    return(
        <header className="bg-[#F5F5DC] shadow-md py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          {/* Logo and name */}
          <div className="flex gap-2 items-center">
            <Link href={'/'}>
              <div className="flex gap-1 items-center cursor-pointer">
                <Image src='/jady.png' alt='logo' width={50} height={50} />
                <span className="text-xl lg:block hidden font-bold text-green-600">
                  Orecordify
                </span>
              </div>
            </Link>
          </div>

          {/* Sign In Button */}
          <div className="flex items-center">
          <SignedOut>
            <Button className="text-white"><SignInButton /></Button>
        
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
          </div>
        </div>
      </header>
    )
}
export default Appbar