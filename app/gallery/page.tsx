'use client'
import React from 'react';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const collections = [
  {
    id: 1,
    name: "Neon Dreams Collection",
    artist: "Sarah Chen",
    style: "Cyberpunk Neon Art",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80",
    artistImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Digital Surrealism",
    artist: "Emma Watson",
    style: "Surreal Digital Art",
    coverImage: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80",
    artistImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Abstract Minimalism",
    artist: "Marcus Rivera",
    style: "Minimal Abstract Art",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80",
    artistImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Ethereal Dreams",
    artist: "Luna Park",
    style: "Ethereal Digital Art",
    coverImage: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80",
    artistImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80"
  }
];

export default function Gallery() {
  const router = useRouter();

  const handleViewCollection = (artist: string) => {
    const encodedArtist = encodeURIComponent(artist);
    router.push(`/gallery/artistgallery?artist=${encodedArtist}`);
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            Art Collections
          </h1>
          <p className="text-xl text-gray-400">
            Explore unique AI art collections and unlock their creative potential
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all cursor-pointer"
              onClick={() => handleViewCollection(collection.artist)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={collection.coverImage}
                  alt={collection.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={collection.artistImage}
                    alt={collection.artist}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{collection.name}</h3>
                    <p className="text-purple-400">{collection.artist}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{collection.style}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}