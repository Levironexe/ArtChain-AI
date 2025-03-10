'use client'
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { artistCollections } from '../../lib/artistCollections';
import ArtistGallery from '../../components/ArtistGallery';
import { Artist } from '@/app/lib/types';

export default function ArtistGalleryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArtistGalleryContent />
    </Suspense>
  );
}

function ArtistGalleryContent() {
  const searchParams = useSearchParams();
  const artistName = searchParams.get('artist');
  
  if (!artistName || !(artistName in artistCollections)) {
    return (
      <div className="pt-24 min-h-screen text-center">
        <h1 className="text-2xl text-white">Artist not found: {artistName}</h1>
        <pre className="text-gray-400 mt-4">Available artists: {Object.keys(artistCollections).join(', ')}</pre>
      </div>
    );
  }

  const artist = artistCollections[artistName as Artist];
  return <ArtistGallery artist={artist} />;
}