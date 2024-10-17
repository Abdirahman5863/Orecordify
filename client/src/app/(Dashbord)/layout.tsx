import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from 'next/image';
import Link from "next/link";

export default function DashbordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex">

      {/* left */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-[#F5F5DC] space-y-4 fixed h-full overflow-y-auto"> {/* Add 'overflow-y-auto' for scrolling */}
        <div className='p-2'>
          <Link href={'/'}>
            <div className="flex gap-1 items-center cursor-pointer">
              <Image src='/jady.png' alt='logo' width={50} height={50} />
              <span className="text-xl lg:block hidden font-bold text-green-600">
                Orecordify
              </span>
            </div>
          </Link>
        </div>

        <Menu />
      </div>

      {/* right */}
      <div className="ml-[14%] md:ml-[8%] lg:ml-[16%] xl:ml-[14%] w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] overflow-y-auto h-screen">

        <Navbar />
        {children}

      </div>

    </div>
  );
}
