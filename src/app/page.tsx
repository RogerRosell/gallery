// import { getServerSession } from 'next-auth';
import Filters from '@/components/Filters';
import { Gallery } from '@/components/Gallery';
import { redirect } from 'next/navigation';
import { getFilterData } from '@/actions';
import { getUniqueKeywords, getFullGalleryList } from '@/actions/galleryList';
import { getImagesList } from '@/actions/galleryList';
import AppInitialiser from './utils/AppInitialiser';

export default async function Home() {
  try {
    const filterData = getFilterData();
    const keywords = await getUniqueKeywords();
    const images = await getImagesList();
    const initTree = await getFullGalleryList();
  // try {
    // const session = await getServerSession();
    return (
      <main className=''>
        {/* {session?.user?.name ? ( */}
        <AppInitialiser 
            initTree={initTree}
            filterData={filterData}
            keywords={keywords}
            allImages={images}
            filteredImages={images}
          >
          <div>
            <div className="flex gap-4">
              <Filters />
            </div>
            <Gallery />
          </div>
          </AppInitialiser>
        {/*// ) : (
        //   <div>
        //     <h1>Family Gallery</h1>
        //     <p>Sign in to see the gallery</p>
        //   </div>
        // )}*/}
      </main>
    );
  } catch (error) { console.log("error", error); redirect("/api/auth/signin") }

}