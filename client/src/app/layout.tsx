import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from '@clerk/nextjs'


// import { Providers } from "@/components/Providers";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Orecordify",
  description: "Manage seamlesly Your Oders and Customers with Orcordify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      
    <html lang="en">
   
       
         
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <ClerkLoading>
          <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
          </ClerkLoading>
          <ClerkLoaded>
        {children}
        </ClerkLoaded>
      </body>
     
     
     
    </html>
    </ClerkProvider>
   
  );
}
