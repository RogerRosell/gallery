'use client';

import { TImage } from '@/dataModel/image';
import { useFAlbumStore } from '@/store';
import { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AppInitialiser({ initTree, filterData, allImages, filteredImages, children}: { initTree: any, filterData: any, allImages: TImage[], filteredImages: TImage[], children: ReactNode }) {
  console.log("AppInitialiser triggered");
  const directoryTree = useFAlbumStore((state) => state.directoryTree);
  if ( Object.keys(directoryTree).length === 0 ) {
  useFAlbumStore.setState(({ directoryTree: initTree, filterData, allImages, filteredImages }) )
  console.log("AppInitialiser hydrated");
  }
  
  return children;
}