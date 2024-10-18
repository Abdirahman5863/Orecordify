import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='flex justify-center items-center bg-slate-500 h-screen'>
    <SignIn />
  </div>
}