import type React from 'react';
import { useState, useEffect } from 'react';
import UseScreenSize from '../../../hooks/useScreenSize';
import Link from 'next/link';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { isDesktop } = UseScreenSize();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      <Link href={`/search?query=${encodeURIComponent(query.trim())}`} />;
      if (!isDesktop) setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Auto-focus saat modal terbuka (mobile)
  useEffect(() => {
    if (isOpen && !isDesktop) {
      const input = document.getElementById(
        'mobile-search-input'
      ) as HTMLInputElement;
      input.focus();
    }
  }, [isOpen, isDesktop]);

  return (
    <>
      {/* Mobile Icon Trigger */}
      {!isDesktop && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          title='Search'
          className='p-1 hover:bg-neutral-800 rounded transition-colors cursor-pointer'
        >
          <img src='/icon/search.svg' alt='search' className='w-5 h-5' />
        </button>
      )}

      {/* Desktop Search Bar */}
      {isDesktop && (
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
          <div className='flex bg-neutral-950/60 text-white px-4 py-2 rounded-2xl w-[243px] border border-neutral-800 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 transition-all'>
            <button
              type='submit'
              className='p-2 hover:bg-neutral-800 rounded transition-colors cursor-pointer'
              disabled={!query.trim()}
            >
              <img
                src='/icon/search.svg'
                alt='search'
                className={`w-5 h-5 ${!query.trim() ? 'opacity-50' : ''}`}
              />
            </button>
            <input
              type='text'
              placeholder='Search Movie'
              value={query}
              className='w-full text-md-regular placeholder-neutral-500'
              onChange={handleInputChange}
              autoComplete='off'
            />
            {query && (
              <button
                type='button'
                onClick={() => setQuery('')}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer'
              >
                <div className='w-5 h-5 bg-neutral-700 rounded-full flex items-center justify-center text-black'>
                  x
                </div>
              </button>
            )}
          </div>
        </form>
      )}

      {/* Mobile Fullscreen Search Mode */}
      {!isDesktop && isOpen && (
        <div className='fixed inset-0 z-101 bg-black flex items-start px-4 py-6'>
          <form
            onSubmit={handleSubmit}
            className='flex items-center gap-2 w-full'
          >
            <button
              onClick={() => setIsOpen(false)}
              type='button'
              className='p-1 hover:bg-neutral-800 rounded transition-colors'
            >
              <img src='/icon/arrow-left.svg' alt='back' className='w-6 h-6' />
            </button>
            <div className='flex w-full bg-neutral-800 text-white px-4 py-2 rounded-xl outline-none transition-all'>
              <button
                type='submit'
                className='p-2 hover:bg-neutral-800 rounded transition-colors'
                disabled={!query.trim()}
              >
                <img
                  src='/icon/search.svg'
                  alt='search'
                  className={`w-5 h-5 ${
                    !query.trim() ? 'opacity-50' : ''
                  } cursor-pointer`}
                />
              </button>
              <input
                id='mobile-search-input'
                type='text'
                placeholder='Search Movie'
                className='px-4 py-2 rounded-md w-full text-md-regular placeholder-neutral-500'
                value={query}
                onChange={handleInputChange}
                autoComplete='off'
              />
              {query && (
                <button
                  type='button'
                  onClick={() => setQuery('')}
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer'
                >
                  <div className='w-5 h-5 bg-neutral-700 rounded-full flex items-center justify-center text-black'>
                    x
                  </div>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SearchBar;
