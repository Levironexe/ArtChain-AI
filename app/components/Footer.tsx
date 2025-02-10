import React from 'react';
import { Twitter, Instagram, Github, Palette } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pb-12 pt-20 bg-black">
      <div className="relative max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"> {/* Container for absolute positioning */}
        <div className={`absolute inset-0 bg-gradient-to-r rounded-[82px] sm:rounded-[90px] lg:rounded-[98px] from-purple-500 via-purple-400 to-pink-600 blur-xl opacity-75 animate-pulse`}></div>
        <div className="relative z-10 p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-gray-950 to-gray-900 rounded-[50px]">
          <div className="flex justify-between items-end pb-8 sm:pb-10 lg:pb-12">
            <div className='flex-1'>
              <div className='flex items-center gap-[6px] mb-3'>
                <Palette className='w-10 h-10 text-white'/>
                <h3 className="text-2xl font-bold text-white">ArtChain AI</h3>
              </div>
              
              <p className="text-[18px] text-white">
                The future of digital art creation and ownership, powered by AI and blockchain technology.
              </p>
            </div>
            
            <div className='h-full flex-1 flex flex-col items-end justify-end'>
              <div className="flex space-x-4 mb-4 text-white">
                <a href="#" className="hover:scale-125 transition-all duration-200">
                  <Twitter className="w-8 h-8" />
                </a>
                <a href="#" className="hover:scale-125 transition-all duration-200">
                  <Instagram className="w-8 h-8" />
                </a>
                <a href="#" className="hover:scale-125 transition-all duration-200">
                  <Github className="w-8 h-8" />
                </a>
              </div>
              <div className='flex gap-8 text-[18px] font-semibold text-white'>
                <a className='hover:scale-110 transition-all duration-200' href='https://maps.app.goo.gl/wkyeY5hfE8Sjme6S8'>
                  Our office
                </a>
                <a className='hover:scale-110 transition-all duration-200' href='/aboutus'>
                  About us
                </a>
                <a className='hover:scale-110 transition-all duration-200' href='artchainaiblog'>
                  Blog
                </a>
                <a className='hover:scale-110 transition-all duration-200' href='mailto:nguyenphuoc4805@gmail.com'>
                  Contact us
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-purple-500 flex justify-between pt-4 sm:pt-6 lg:pt-8 pb-4 sm:pb-6 lg:pb-8 border-t border-white">
            <p className='text-[18px]'>&copy; 2024 ArtChain AI. All rights reserved.</p>
            <div className='flex gap-8 text-[18px] font-semibold pr-8'>
              <a className="text-purple-400" href='https://maps.app.goo.gl/wkyeY5hfE8Sjme6S8'>
                Term & Service
              </a>
              <a className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent" href='/aboutus'>
                Cookie Policy
              </a>
              <a className='text-pink-600' href='mailto:nguyenphuoc4805@gmail.com'>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}