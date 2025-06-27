'use client';

import React from 'react';
import { Search, Menu } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className='flex items-center justify-between text-4xl px-16 py-20 border-b border-neutral-300'>
      <div className='flex items-center justify-between gap-7'>
        <Image src='/logo-symbol.png' alt='Logo' width={19.73} height={21.64} />
        <span className='font-semibold text-md leading-24 text-neutral-950'>
          Your Logo
        </span>
      </div>
      <div className='flex items-center justify-between gap-24'>
        <Search size={24} />
        <Menu size={24} />
      </div>
    </div>
  );
};

export default Navbar;
