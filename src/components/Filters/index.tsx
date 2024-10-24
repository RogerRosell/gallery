'use client';
import { useState } from 'react';
import { FilterSelect } from '@/components/FilterSelect';
import { useFAlbumStore } from '@/store';
import ResetFilters from '@/components/SVG/ResetFilters';
import { filterImagesByKeywords, getFilterData, filterImages } from '@/lib/filterUtils';
import { KeywordsList } from '@/components/KeywordsList';


type activeFilters = {
    event: string,
    lloc: string,
    any: string,
    keywords: string[]
}

const Filters = () => {  

  const filterData = useFAlbumStore(state => state.filterData);
  const allImages = useFAlbumStore(state => state.allImages);
  const keywords = useFAlbumStore(state => state.keywords); 
  const filteredImages = useFAlbumStore(state => state.filteredImages);
  const setFilterData = useFAlbumStore(state => state.setFilterData);
  const setFilteredImages = useFAlbumStore(state => state.setFilteredImages);
  const resetFilteredImages = useFAlbumStore(state => state.resetFilteredImages);

  const [activeFilters, setActiveFilters] = useState<activeFilters>({
    event: "",
    lloc: "",
    any: "",
    keywords: []
  });
  
  const onChangeHandler = (id: string, value: string) => {      
    if (id ==="keywords") {
      const updatedKeywords = activeFilters.keywords.includes(value) ? activeFilters.keywords.filter(keyword => keyword !== value) : [...activeFilters.keywords, value];
      setActiveFilters({...activeFilters, [id]: updatedKeywords});
      setFilteredImages(filterImagesByKeywords(filteredImages, updatedKeywords));
      setFilterData(getFilterData(filterImagesByKeywords(filteredImages, updatedKeywords)));
      // useFAlbumStore.setState(({ filteredImages: filterImagesByKeywords(filteredImages, updatedKeywords) }))

    } else {
      const newActiveFilters = {...activeFilters, [id]: value};
      setActiveFilters(newActiveFilters);
      console.log("newActiveFilters", newActiveFilters);
      // setActiveFilters({...activeFilters, [id]: value});
      const newFilteredImages = filterImages(filteredImages, newActiveFilters);
      setFilteredImages(newFilteredImages);
      setFilterData(getFilterData(newFilteredImages))
    }
}

const removeKeyword = (keyword: string) => {
  const updatedKeywords = activeFilters.keywords.filter(k => k !== keyword);
  setActiveFilters({...activeFilters, keywords: updatedKeywords});
  setFilteredImages(filterImagesByKeywords(filteredImages, updatedKeywords));
  setFilterData(getFilterData(filterImagesByKeywords(filteredImages, updatedKeywords)));
}

const resetFilters = () => {
  setActiveFilters({
  event: "",
    lloc: "",
    any: "",
    keywords: []
});
resetFilteredImages();
// const newFilterData = getFilterData(allImages);
setFilterData(getFilterData(allImages));

return true;
}

  return (
    <>
    {filterData.titles && <FilterSelect id={"event"} values={filterData.titles.filter((title:string): title is string => title !== undefined)} onChangeHandler={onChangeHandler} />}
    {filterData.places && <FilterSelect id={"lloc"} values={filterData.places.filter((place:string): place is string => place !== undefined)} onChangeHandler={onChangeHandler} />}
    {filterData.years && <FilterSelect id={"any"} values={filterData.years.filter((year:string): year is string => year !== undefined)} onChangeHandler={onChangeHandler} />}  
    {keywords && keywords?.length > 0 && 
    <div>
      <FilterSelect id={"keywords"} values={keywords.filter((keyword:string): keyword is string => keyword!== undefined)} onChangeHandler={onChangeHandler} />
        {activeFilters.keywords.length > 0 && 
        <KeywordsList keywords={[...activeFilters.keywords]} removeKeyword={removeKeyword} />
        }
    </div>}      
    <button onClick={()=> resetFilters()}><ResetFilters /></button>    
    </>
  )
}

export default Filters