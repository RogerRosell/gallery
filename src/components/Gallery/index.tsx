"use client";

import { useFAlbumStore } from '@/store';
import Image from 'next/image';

const getFolderFromImageName = (name: string) => {
  const folder = name.split("-")
  folder.pop();
  return folder.join("-");
}

export const Gallery = () => {
  const filteredImages = useFAlbumStore((state) => state.filteredImages);

  return (
    <div className="flex gap-4 flex-wrap pt-12">
      {filteredImages && filteredImages.length > 0 &&
        filteredImages.map((image) => {
          const folder = getFolderFromImageName(image.name);
          return (
            <div key={image.name} style={{ position: 'relative', width: '250px', height: '250px' }}>
              <Image alt={image.name} src={`/gallery-images/${folder}/${image.name}`} sizes='250' fill style={{
                objectFit: 'contain',
              }} />
            </div>
          )
        })
      }</div>
  )
}