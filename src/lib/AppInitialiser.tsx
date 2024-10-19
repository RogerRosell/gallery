'use client';

import { TImage } from '@/dataModel/image';
import { useFAlbumStore } from '@/store';
import { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AppInitialiser({ initTree, filterData, allImages, filteredImages, keywords, children}: { initTree: any, filterData: any, allImages: TImage[], filteredImages: TImage[], keywords: string[],children: ReactNode }) {
  console.log("AppInitialiser triggered");
  // console.log("keywords", keywords);
  const directoryTree = useFAlbumStore((state) => state.directoryTree);
  if ( Object.keys(directoryTree).length === 0 ) {
  useFAlbumStore.setState(({ directoryTree: initTree, filterData, allImages, keywords, filteredImages }) )
  console.log("AppInitialiser hydrated");
  }
  
  return children;
}