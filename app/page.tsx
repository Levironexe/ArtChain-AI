// app/page.tsx
'use client'
import Hero from '@/app/components/Hero'
import Features from '@/app/components/Features'
import HowItWorks from '@/app/components/HowItWorks'
import ArtistSection from '@/app/components/ArtistSection'
import { useState } from 'react'
import { artistCollections } from '@/app/lib/artistCollections'
import { Artist, ArtistData } from '@/app/lib/types'

export default function Home() {
  const [selectedArtist, setSelectedArtist] = useState<ArtistData | null>(null);

  const handleViewGallery = (artist: { artist: Artist }) => {
    const artistData = artistCollections[artist.artist];
    if (artistData) {
      setSelectedArtist(artistData);
      window.scrollTo(0, 0);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <Features />
      <HowItWorks />
      <ArtistSection onViewGallery={handleViewGallery} />
    </main>
  )
}