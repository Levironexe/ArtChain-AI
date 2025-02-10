import React from 'react';
import { Heart, Share2, Cpu, Database, Palette, CirclePlus } from 'lucide-react';

interface ArtPiece {
  id: string;
  title: string;
  image: string;
  description: string;
}

interface Collection {
  name: string;
  description: string;
  numOfGenerate: string;
  aiDatasetSize: string;
  style: string;
  pieces: ArtPiece[];
}

interface ArtistGalleryProps {
  artist: {
    name: string;
    image: string;
    bio: string;
    totalSales: string;
    collection: Collection;
  };
}

export default function ArtistGallery({ artist }: ArtistGalleryProps) {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Artist Header */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={artist.collection.pieces[0].image}
            alt="Cover"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto flex items-end space-x-6 px-4 sm:px-6 lg:px-8">
            <img
              src={artist.image}
              alt={artist.name}
              className="object-cover w-24 h-24 rounded-full border-4 border-purple-600"
            />
            <div>
              <h1 className="text-4xl font-bold">{artist.name}</h1>
              <p className="text-gray-400 mt-2">{artist.bio}</p>
              <p className="text-purple-400 mt-1">Total Sales: {artist.totalSales}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800/50 rounded-xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">{artist.collection.name}</h2>
              <p className="text-gray-400 mb-6">{artist.collection.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{artist.collection.style}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{artist.collection.aiDatasetSize}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center bg-gray-900/50 rounded-xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Number of Uses</h3>
                <p className="text-3xl font-bold text-purple-400">{artist.collection.numOfGenerate}</p>

              </div>
              <button className="w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center space-x-2 transition-all">
                <CirclePlus className="w-4 h-4" />
                <span>Add collection to AI Studio</span>
              </button>
              <div className='pt-3 italic text-white/50'>Feature coming soon</div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artist.collection.pieces.map((piece) => (
            <div key={piece.id} className="bg-gray-800/50 rounded-xl overflow-hidden">
              <div className="relative aspect-w-1 aspect-h-1">
                <img
                  src={piece.image}
                  alt={piece.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold">{piece.title}</h3>
                    <p className="text-gray-300 text-sm">{piece.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{piece.title}</h3>
                <p className="text-gray-400 text-sm">{piece.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Dataset Preview */}
        <div className="mt-12 bg-gray-800/50 rounded-xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Cpu className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">AI Training Dataset</h2>
          </div>
          <p className="text-gray-400 mb-4">
            This collection includes a comprehensive AI training dataset that captures the essence of {artist.name}'s unique artistic style.
            Once unlocked, you can use this dataset to:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
            <li>Generate new artwork in the artist's signature style</li>
            <li>Train custom AI models for your own projects</li>
            <li>Study and analyze the artistic techniques</li>
            <li>Create variations and derivatives</li>
          </ul>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">
              Dataset includes: Raw artwork files, style vectors, training parameters, and documentation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}