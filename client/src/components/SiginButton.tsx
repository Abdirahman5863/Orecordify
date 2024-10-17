
// "use client"
// import { User2Icon } from "lucide-react";
// import {signIn,useSession} from "next-auth/react"
// import Link from "next/link";
// import { Button } from "./ui/button";



// export const SigninButton = () => {
//     const {data: session}= useSession();
//     if (session && session.user){
//         return(
//             <div className="">
//                 <Link href='/profile' className="hover:bg-slate-500">
//                 <User2Icon className="hover:text-green-400"/>
//                 </Link>


//             </div>
//         )
//     }
//     return(
//         <Button onClick={() => signIn()}    className="bg-white text-green-500 px-6 py-2 rounded-md shadow-md">Sign in</Button>
//     )
// }