"use client";

import { TDirectoryItem } from '@/app/types';
import { useFAlbumStore } from '@/store';
import Album from '@/app/components/Album';

export const Gallery = ({ tree }: { tree: TDirectoryItem[] }) => {
  const { setFolders, folders } = useFAlbumStore();
  if (!folders) setFolders(tree);

  return (
    <div className='flex flex-col gap-4'>
      {folders && folders.map((folder: TDirectoryItem) => (
        <Album key={folder.name} folder={folder} />
      ))}
    </div>
  )
}