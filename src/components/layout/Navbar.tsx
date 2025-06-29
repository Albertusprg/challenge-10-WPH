'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '../ui/SearchBar/SearchBar';
import useScreenSize from '@/hooks/useScreenSize';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });
const Navbar = () => {
  const [openHamburger, setOpenHamburger] = useState(true);
  const handleHamburger = () => {
    setOpenHamburger(!openHamburger);
  };
  const { isDesktop } = useScreenSize();
  const mobileMenuButton = openHamburger ? (
    <Menu size={24} onClick={handleHamburger} />
  ) : (
    <X size={24} onClick={handleHamburger} />
  );

  useEffect(() => {
    setOpenHamburger(true);
  }, [isDesktop]);

  return (
    <div
      className='fixed top-0 right-0 left-0 bg-white'
      style={{
        height: 'clamp(64px, calc(3.62rem + 1.53vw), 80px)',
      }}
    >
      <div
        className='flex items-center justify-between text-4xl py-20 border-b border-neutral-300 h-full'
        style={{
          paddingInline: 'clamp(16px, calc(-1.44rem + 9.93vw), 120px)',
        }}
      >
        <Link href={'/'} className='flex items-center justify-between gap-7'>
          <Image
            src='/logo-symbol.png'
            alt='Logo'
            width={19.73}
            height={21.64}
            className='lg:h-32.5 lg:w-30'
          />
          <span
            className={`font-semibold text-md leading-24 text-neutral-950 lg:text-2xl ${outfit.className}`}
          >
            Your Logo
          </span>
        </Link>
        {isDesktop ? <SearchBar /> : ''}
        <div className='flex items-center justify-between gap-24'>
          {!isDesktop ? <SearchBar /> : ''}

          {isDesktop ? (
            <nav className='flex justify-center items-center gap-24 mx-auto'>
              <Link
                href='/login'
                className='flex items-center text-sm font-semibold text-center text-blue-500'
              >
                Login
              </Link>
              <div className='w-px h-23 bg-neutral-300'></div>
              <Link
                href='/register'
                className='flex items-center text-center justify-center text-sm font-regular w-182 h-44 bg-primary-300 rounded-full text-white'
              >
                Register
              </Link>
            </nav>
          ) : (
            mobileMenuButton
          )}
        </div>
      </div>
      {/* Open Menu */}
      <div
        id='mobileMenu'
        className={`fixed  left-0 w-full bg-white z-100 h-screen ${
          openHamburger ? 'hidden' : 'flex'
        } flex-col`}
        style={{
          paddingInline: 'clamp(16px, 11.84vw - 30.55px, 140px)',
          top: 'clamp(64px, calc(3.62rem + 1.53vw), 80px)',
        }}
      >
        <nav className='flex flex-col justify-center items-center gap-16 mx-auto w-214 pt-39'>
          <Link
            href='/login'
            className='flex items-center text-sm font-semibold text-center'
          >
            Login
          </Link>
          <Link
            href='/register'
            className='flex items-center text-center justify-center text-sm font-regular h-44 bg-primary-300 rounded-full text-white w-full'
          >
            Register
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
