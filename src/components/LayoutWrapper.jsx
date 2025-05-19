'use client'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { usePathname } from 'next/navigation'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const showLayoutOn = ['/', '/movies', '/tvshows'];
  const showLayout = showLayoutOn.includes(pathname);

  return (
    <>
      {showLayout && <Header />}
      {children}
      {showLayout && <Footer />}
    </>
  );
}
