import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const menuItems= [{
  title: "menu",
  items:[{
    icon:"/home.png",
    label:"Dashbord",
    href:"/admin",

  },
  {
    icon:"/clipboard.png",
    label:"Order",
    href:"/order",

  },
  // {
  //   icon:"/checklist.png",
  //   label:"Listing",
  //   href:"/listing",

  // },
  {
    icon:"/user.png",
    label:"Customer",
    href:"/customer",

  },
  {
    icon:"/data-analytics.png",
    label:"Analytics",
    href:"/analytics",

  },
  
 
 
  
 
  {
    icon:"/settings.png",
    label:"Setting",
    href:"/setting",

  },
 
]},
{
title:"others",
items:[{
  icon:"/community.png",
  label:"community",
  href:"/community",

},
{
  icon:"/encryption.png",
  label:"privacy poloicy",
  href:"/privacy",

},{
  icon:"/logout.png",
  label:"logout",
  href:"/logout",

}]
}
]
const Menu = () => {
  return (
    <div className='mt-4 text-sm h-screen  '>
      {menuItems.map((item) => (
        <div key={item.title} className='flex flex-col max-sm:gap-14 gap-4 mt-8' >
          <span className='lg:block hidden text-green-600 font-bold uppercase my-4 p-2'>{item.title}</span>
          
            {item.items.map((item) => (
              
                 <Link   key={item.label} className='flex gap-4 justify-center  lg:justify-start text-gray-500 p-2 items-center' href={item.href}><Image width={20} height={20} src={item.icon} alt="icon" /> 
                 <span className='hidden lg:block text-green-600'>{item.label}</span></Link>
                
                 ))}
                
                  
                  </div>)
               )}
    </div>
  )
}

export default Menu