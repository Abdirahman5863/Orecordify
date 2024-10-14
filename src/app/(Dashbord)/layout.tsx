
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from 'next/image'
import Link from "next/link";

export default function DashbordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex ">
    
      {/* left */}
<div className="w-[14%] md:w-[8%] lg:w-[16%] xl:[14%] bg-[ffffff] border-r-slate-500 space-y-4" >
<div className='p-2 '>
<Link href={'/'}>
              <div className="flex gap-1 items-center cursor-pointer">
                <Image src='/jady.png' alt='logo' width={50} height={50} />
                <span className="text-xl lg:block hidden font-bold text-green-600">
                  Orecordify
                </span>
              </div>
            </Link>
    </div>
  
<Menu/>
</div>
{/* right */}
<div className="w-[86%] md:w-[92%] lg:w-[84%] xl:[86%] bg-slate-100 ">

  <Navbar/>
{children}

</div>

    </div>
  
  );
}