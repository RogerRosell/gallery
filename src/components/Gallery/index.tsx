"use client";

import { TDirectoryItem } from '@/app/types';
import { useFAlbumStore } from '@/store';
import Album from '@/components/Album';

export const Gallery = ({ tree }: { tree: TDirectoryItem[] }) => {
  const { setInitTree, folders } = useFAlbumStore();
  if (!folders) setInitTree(tree);

  return (
    <div className='flex flex-col gap-4'>
      {folders && folders.map((folder: TDirectoryItem) => (
        <Album key={folder.name} folder={folder} />
      ))}
    </div>
  )
}