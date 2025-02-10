'use client'
import React, { useEffect, useState } from 'react';
import { Palette, Wand2, X } from 'lucide-react';
import { ConnectButton } from '@mysten/dapp-kit';
import Link from 'next/link';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
  
    window.addEventListener('scroll', handleScroll);
    // Trigger initial scroll position
    handleScroll(); // Add this to set initial scroll position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };




  return (
    <>
      <nav className={`fixed w-full z-50 ${scrollY > 10 ? "bg-black/50 backdrop-blur-xl" : "bg-transparent"} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Palette className="w-8 h-8 text-purple-500" />
              <Link href={'./'} className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                ArtChain AI
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Link href={'./'}>Home</Link>
              </button>
              <button

                className="text-gray-300 hover:text-white transition-colors"
              >
                <Link href={'/features'}>Features</Link>
                
              </button>
              <button

                className="text-gray-300 hover:text-white transition-colors"
              >
                <Link href={'/gallery'}>Gallery</Link>
              </button>
              <button

                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Wand2 className="w-5 h-5" />
                <a href='/ai-studio'>AI Studio</a>
              </button>
              <ConnectButton
                style={{
                  padding: "10px 18px",
                  backgroundColor: "#7e22ce",
                  borderRadius: "0.5rem",
                  transition: "all 0.3s",
                  fontSize: "1.1rem",
                  color: "white", // Add white text color
                  fontWeight: "normal"
                }}
              />

            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button

              className="text-2xl text-gray-300 hover:text-white transition-colors"
            >
              <Link href={'/features'}>Home</Link>
            </button>
            <button

              className="text-2xl text-gray-300 hover:text-white transition-colors"
            >
               <Link href={'/features'}>Features</Link>
            </button>
            <button

              className="text-2xl text-gray-300 hover:text-white transition-colors"
            >
              <Link href={'/gallery'}>Gallery</Link>
            </button>
            <button

              className="text-2xl text-gray-300 hover:text-white transition-colors"
            >
              <Link href={'/ai-studio'}>
                AI Studio
              </Link>
            </button>
            <ConnectButton
              style={{
                padding: "10px 18px",
                backgroundColor: "#7e22ce",
                borderRadius: "0.5rem",
                transition: "all 0.3s",
                fontSize: "1.1rem",
                color: "white", // Add white text color
                fontWeight: "normal"
              }}
            />

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
