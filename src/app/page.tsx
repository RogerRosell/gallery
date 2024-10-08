import { getFilterData } from '@/actions';
import { getUniqueKeywords } from '@/actions/galleryList';
import { getImagesList } from '@/actions/galleryList';
import { getServerSession } from 'next-auth';
import { FilterSelect } from '@/components/FilterSelect';

export default async function Home() {  
  try {
    const session = await getServerSession();
    const filterData = getFilterData();
    const keywords = await getUniqueKeywords();
    const images = await getImagesList();
    // const fullGallery = await getFullGalleryList();
    // console.log("fullGallery >>", fullGallery);
   
    return (
      <main className=''>
        {session?.user?.name ? (
          <div>
            <h1>Hola {session.user.name}</h1>
            <div className="flex gap-4">            
            {filterData.titles && <FilterSelect id={"títol"} value={filterData.titles.filter((title): title is string => title !== undefined)} />}
            {filterData.places && <FilterSelect id={"lloc"} value={filterData.places.filter((place): place is string => place !== undefined)} />}
            {filterData.years && <FilterSelect id={"any"} value={filterData.years.filter((year): year is string => year !== undefined)} />}
            {keywords && keywords?.length > 0 && <FilterSelect id={"keywords"} value={keywords} />}
            </div>
            <div>{images && images.length > 0 && 
              images.map((image) => {
                // console.log("image", image);
                return <p key={image.name}>{image.name}</p>
              })
            }</div>
          </div>
        ) : (
          <div>Not logged in</div>
        )}
        
        </main>
    );

  } catch (error) {console.log("error", error);}
  
  
  
  // const folders = getFoldersList("gallery-images");
  
  // const keywordsList = getKeywordsList();
  // console.log("keywordsList from Page >>", keywordsList);
  // console.log("filterData", filterData);
  
}