// import { getServerSession } from 'next-auth';
import Filters from '@/components/Filters';
import { Gallery } from '@/components/Gallery';
import { getFullGalleryList } from '@/actions/galleryList';
import AppInitialiser from '@/lib/AppInitialiser';
import { getImagesList, getFilterData } from '@/lib/filterUtils';

export default async function Home() {
  try {
    const initTree = await getFullGalleryList();
    console.log("initTree >> ", initTree);
 
    const images = initTree && initTree.length > 0 && getImagesList(initTree);
    // const keywords = initTree && initTree.length > 0 && getUniqueKeywords(initTree);
    const filterData = images ? getFilterData(images) : undefined;

    // console.log("images >> ", images);
    // console.log("keywords >> ", keywords);
    // console.log("filterData >> ", filterData);

    return (
      <main>
        here comes the fun
        {/* {keywords && keywords.length > 0 && images && images.length > 0 && initTree && filterData && ( */}
        {images && images.length > 0 && initTree && filterData && (
          <AppInitialiser
            initTree={initTree}
            filterData={filterData}
            // keywords={keywords}
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
      </main>
    )
  } catch (error) {
    console.log("Error >> ", error);
    return <main><p>There&apos;s been an error</p></main>
  }
}