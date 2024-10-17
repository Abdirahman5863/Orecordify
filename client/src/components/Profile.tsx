// "use client"
// import { User2Icon, LogOutIcon } from "lucide-react";
// import { Button } from "./ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { SignInButton } from "@clerk/nextjs";

// const Profile = () => {
//   const { data: session } = useSession();

//   if (session && session.user) {
//     return (
//         <div className="flex items-center justify-center h-screen bg-green-100">
//         <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-xl">
//         <Avatar className="mb-4 justify-center flex items-center">
//           <AvatarImage src={session.user.image || "/default-avatar.png"} alt="Profile Image" />
//           <AvatarFallback>
//             <User2Icon className="w-8 h-8" />
//           </AvatarFallback>
//         </Avatar>
        
//         <h2 className="text-2xl font-bold">{session.user.name}</h2>
//         <p className="text-sm text-white">{session.user.email}</p>
        
//         <div className="flex mt-4 gap-4">
//           <Button className="bg-white text-green-500 px-4 py-2 rounded-md" onClick={() => signOut()}>
//             <LogOutIcon className="inline w-5 h-5 mr-2" />
//             Sign Out
//           </Button>
     
//         </div>
//       </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center h-screen bg-green-500">
//         <SignInButton />
//       {/* <Button
//         onClick={() => signIn()}
//         className="bg-white text-green-500 px-6 py-2 rounded-md shadow-md"
//       >
//         Sign In
//       </Button> */}
//     </div>
//   );
// };

// export default Profile;
import React from 'react'

const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export default Profile