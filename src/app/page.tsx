import { getImagesList } from '@/app/actions/imagesList'
import { TDirectoryItem } from './types';
import { Gallery } from './components/Gallery';

export default function Home() {
  const images = getImagesList();
  const folders: TDirectoryItem[] = images.filter((item: { type: string }) => item.type === 'directory');
  return (
    <main className=''>
      <Gallery tree={folders} />
      </main>
  );
}