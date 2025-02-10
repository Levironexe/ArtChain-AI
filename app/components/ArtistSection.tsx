'use client'
import React from 'react';
import { ArtistSectionProps, Artist } from '@/app/lib/types';

export default function ArtistSection({ onViewGallery }: ArtistSectionProps) {
  const artists = [
    {
      id: 1,
      name: "Neon Dreams Collection",
      artist: "Sarah Chen" as Artist,  // Type assertion here
      price: "12.5 ETH",
      style: "Cyberpunk Neon Art",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80",
      artistImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Abstract Minimalism",
      artist: "Marcus Rivera" as Artist,  // Type assertion here
      price: "8.8 ETH",
      style: "Minimal Abstract Art",
      coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80",
      artistImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Digital Surrealism",
      artist: "Emma Watson" as Artist,  // Type assertion here
      price: "15.2 ETH",
      style: "Surreal Digital Art",
      coverImage: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80",
      artistImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Top Collections</h2>
          <p className="text-gray-400 text-xl">Unlock unique artistic styles for AI generation</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div key={artist.id} className="rounded-xl overflow-hidden bg-gray-800/50 hover:bg-gray-800 transition-all">
              <div className="aspect-w-16 aspect-h-9 relative">
                <img src={artist.coverImage} alt={`Art by ${artist.name}`} className="w-full h-64 object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img src={artist.artistImage} alt={artist.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h3 className="font-semibold">{artist.name}</h3>
                    <p className="text-purple-400">{artist.style}</p>
                  </div>
                </div>
                <div className="mb-4 text-center bg-gray-900/50 rounded-lg py-2">
                  <p className="text-sm text-gray-400">Collection Price</p>
                  <p className="text-xl font-bold text-purple-400">{artist.price}</p>
                </div>
                <button 
                  onClick={() => onViewGallery({ artist: artist.artist })}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all"
                >
                  View Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}