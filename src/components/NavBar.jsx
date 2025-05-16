import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

function NavBar() {
  const pathname = usePathname();
  return (
    <>
        <div className='text-white mt-[-28px] ml-[60%] mr-[21.5%]'>
            <nav className=''>
                <ul className='flex justify-between'>
                    <Link href={"/"} className={`cursor-pointer hover:text-[#ff2b13] ${pathname === '/' ? "text-[#ff2b13]" : "text-white"}`}>Home</Link>
                    <Link href={"/movies"} className={`cursor-pointer hover:text-[#ff2b13] ${pathname === '/movies' ? "text-[#ff2b13]" : "text-white"}`}>Movies</Link>
                    <Link href={"/tvshows"} className={`cursor-pointer hover:text-[#ff2b13] ${pathname === '/tvshows' ? "text-[#ff2b13]" : "text-white"}`}>TV Shows</Link>
                </ul>
            </nav>
        </div>
    </>
  )
}

export default NavBar