"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { User2Icon, LogOutIcon } from "lucide-react";
// import { Button, Avatar, AvatarImage, AvatarFallback } from "@shadcn/ui";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-500">
        <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-xl">
          <Avatar className="mx-auto mb-4">
            <AvatarImage  src={session.user.image || "/default-avatar.png"} alt="Profile Image" />
            <AvatarFallback>
              <User2Icon className="w-10 h-10" />
            </AvatarFallback>
          </Avatar>
          
          <h2 className="text-center text-2xl font-bold text-green-500">{session.user.name}</h2>
          <p className="text-center text-sm text-gray-500">{session.user.email}</p>
          
          <div className="flex justify-center mt-6 gap-4">
            <Button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => signOut()}>
              <LogOutIcon className="inline w-5 h-5 mr-2" />
              Sign Out
            </Button>
            <Link href="/profile-settings" passHref>
              <Button className="bg-green-500 text-white px-4 py-2 rounded-md">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-green-500">
      <Button
        onClick={() => signIn()}
        className="bg-white text-green-500 px-6 py-2 rounded-md shadow-md"
      >
        Sign In
      </Button>
    </div>
  );
};

export default Profile;
