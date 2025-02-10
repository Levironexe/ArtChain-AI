import React from 'react';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80" 
          alt="Abstract Art Background" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Sparkles className="w-16 h-16 mx-auto mb-8 text-purple-500" />
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          The Future of Digital Art
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Create, collect, and trade unique AI-generated artwork backed by blockchain technology.
          Join the revolution of digital art ownership.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        
          <button className="px-8 py-4 bg-transparent border-2 border-purple-600 hover:bg-purple-600/20 rounded-lg font-semibold transition-all">
            Upload Collection
          </button>
          <button
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all "
          >
            <Link href='/gallery'>Explore Gallery</Link>
          </button>
        </div>
      </div>
    </div>
  );
}