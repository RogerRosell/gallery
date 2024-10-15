// import { getServerSession } from 'next-auth';
import Filters from '@/components/Filters';
import { Gallery } from '@/components/Gallery';
import { getFullGalleryList } from '@/actions/galleryList';
import AppInitialiser from '@/lib/AppInitialiser';
import { getImagesList, getUniqueKeywords, getFilterData } from '@/lib/filterUtils';

export default async function Home() {
  let initTree;
  try {
    initTree = await getFullGalleryList();
  } catch (error) {
    console.log("Error >> ", error);
    return <main><p>There&apos;s been an error</p></main>

  } finally {
    const images = initTree && initTree.length > 0 && getImagesList(initTree);
    const keywords = initTree && initTree.length > 0 && getUniqueKeywords(initTree);
    const filterData = images ? getFilterData(images) : undefined;

    return (
      <main>
        {keywords && keywords.length > 0 && images && images.length > 0 && initTree && (
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
      </main>
    )
  }
}