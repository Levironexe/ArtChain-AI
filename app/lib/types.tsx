// lib/types.ts
import { artistCollections } from './artistCollections'

export type Artist = keyof typeof artistCollections;
export type ArtistData = typeof artistCollections[keyof typeof artistCollections];

export interface ArtistSectionProps {
  onViewGallery: (artist: { artist: Artist }) => void;
}