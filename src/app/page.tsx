import { getImagesList } from '@/app/actions/imagesList'
import { TDirectoryItem } from './types';
import { Gallery } from './components/Gallery';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();
  const images = getImagesList();
  const folders: TDirectoryItem[] = images.filter((item: { type: string }) => item.type === 'directory');
  return (
    <main className=''>
      {session?.user?.name ? (
        <div>
          <h1>Welcome {session.user.name}</h1>
          <Gallery tree={folders} />
        </div>
      ) : (
        <div>Not logged in</div>
      )}
      
      </main>
  );
}