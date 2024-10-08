'use client';

import { useParams } from 'next/navigation';
import { useFAlbumStore } from '@/store';
// import { ImageAsync } from '../components/ImageAsync';
import Image from 'next/image';

const Page = () => {
  const { folder } = useParams()
  const { folders } = useFAlbumStore();
  // console.log("folders", folders)
  // if (!folders) setFolders(folders);
  const images = folders?.filter((item: { name: string }) => item.name === folder) || [];
  const imagesList = images[0]?.children || [];
  return (
    <main className='flex gap-12 p-32'>
      {imagesList && imagesList?.map((image) => (
        <Image
          key={image.name}
          src={`/gallery-images/${folder}/${image.name}`}
          alt={image.name}
          width={200}
          height={200}
          data-loaded='false'
          onLoad={event => {
            event.currentTarget.setAttribute('data-loaded', 'true')
          }}
          className='data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10'
        />
      ))}
    </main>
  )
}

export default Page