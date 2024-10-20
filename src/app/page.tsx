import { getServerSession } from 'next-auth';
import Filters from '@/components/Filters';
import { Gallery } from '@/components/Gallery';
import { getFullGalleryList } from '@/actions/galleryList';
import AppInitialiser from '@/lib/AppInitialiser';
import { getImagesList, getFilterData, getUniqueKeywords } from '@/lib/filterUtils';

export default async function Home() {
  try {
    const session = await getServerSession();
    const initTree = await getFullGalleryList();

    const images = initTree && initTree.length > 0 && getImagesList(initTree);
    const filterData = images ? getFilterData(images) : undefined;
    const keywords = images ? getUniqueKeywords(images) : undefined;


    return (
      <main>
        {session && session.user ? (
          <>
            {images && images.length > 0 && initTree && filterData && keywords && keywords.length > 0 && (
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
          </>
        ) : (
          <p>Unauthorized</p>
        )}
      </main>
    )
  } catch (error) {
    console.log("Error >> ", error);
    return <main><p>There&apos;s been an error</p></main>
  }
}