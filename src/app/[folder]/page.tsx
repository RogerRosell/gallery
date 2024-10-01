'use client';

import { useParams } from 'next/navigation';
import { useFAlbumStore } from '@/store';
import Image from 'next/image';

const Page = () => {
  const { folder } = useParams()
  const { folders } = useFAlbumStore()
  const images = folders?.filter((item: { name: string }) => item.name === folder) || [];
  const imagesList = images[0]?.children || [];
  return (
    <main className='flex gap-12 p-32'>
      {imagesList && imagesList.map((image) => (
        <Image
          key={image.name}
          src={`/gallery-images/${folder}/${image.name}`}
          alt={image.name}
          width={200}
          height={200}
        />
      ))}
    </main>
  )
}

export default Page