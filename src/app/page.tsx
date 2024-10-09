// import { getServerSession } from 'next-auth';
import Filters from '@/components/Filters';
import { Gallery } from '@/components/Gallery';
import { redirect } from 'next/navigation';
import { getFilterData } from '@/actions';
import { getUniqueKeywords, getFullGalleryList } from '@/actions/galleryList';
import { getImagesList } from '@/actions/galleryList';
import AppInitialiser from './utils/AppInitialiser';

export default async function Home() {
  const filterData = getFilterData();
  let keywords 
  let images 
  let initTree
  try {    
    keywords = await getUniqueKeywords();
    images = await getImagesList();
    initTree = await getFullGalleryList();
  } catch (error) { console.log("error", error); redirect("/api/auth/signin") }
  // try {
    // const session = await getServerSession();
    return (
      <main className=''>
        {/* {session?.user?.name ? ( */}
        {keywords && images && initTree && (
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
        )}
        
        {/*// ) : (
        //   <div>
        //     <h1>Family Gallery</h1>
        //     <p>Sign in to see the gallery</p>
        //   </div>
        // )}*/}
      </main>
    );
}