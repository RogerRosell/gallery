'use client';

import { TImage } from '@/dataModel/image';
import { useFAlbumStore } from '@/store';
import { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AppInitialiser({ initTree, filterData, keywords, allImages, filteredImages, children}: { initTree: any, filterData: any, keywords: string[], allImages: TImage[], filteredImages: TImage[], children: ReactNode }) {
  console.log("AppInitialiser triggered");
  const directoryTree = useFAlbumStore((state) => state.directoryTree);
  if ( Object.keys(directoryTree).length === 0 ) {
  useFAlbumStore.setState(({ directoryTree: initTree, filterData, keywords, allImages, filteredImages }) )
  console.log("AppInitialiser hydrated");
  }
  
  return children;
}