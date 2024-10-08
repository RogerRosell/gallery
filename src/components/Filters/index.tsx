'use client';
import { useState } from 'react';
import { FilterSelect } from '@/components/FilterSelect';
import { useFAlbumStore } from '@/store';
import ResetFilters from '@/components/SVG/ResetFilters';
import { filterImagesByKeywords } from '@/store/filterUtils'

type activeFilters = {
    event: string,
    lloc: string,
    any: string,
    keywords: string[]
}

const Filters = () => {
  const [activeFilters, setActiveFilters] = useState<activeFilters>({
    event: "",
    lloc: "",
    any: "",
    keywords: []
  });

  const filterData = useFAlbumStore(state => state.filterData);
  const keywords = useFAlbumStore(state => state.keywords); 
  const filteredImages = useFAlbumStore(state => state.filteredImages);
  const resetFilteredImages = useFAlbumStore(state => state.resetFilteredImages);
  
  const onChangeHandler = (id: string, value: string) => {      
    if (id ==="keywords") {
      const updatedKeywords = activeFilters.keywords.includes(value) ? activeFilters.keywords.filter(keyword => keyword !== value) : [...activeFilters.keywords, value];
      setActiveFilters({...activeFilters, [id]: updatedKeywords});
      useFAlbumStore.setState(({ filteredImages: filterImagesByKeywords(filteredImages, updatedKeywords) }))
    } else {
      setActiveFilters({...activeFilters, [id]: value});
    }
}

const resetFilters = () => {
  setActiveFilters({
  event: "",
    lloc: "",
    any: "",
    keywords: []
});
resetFilteredImages();

return true;
}
  // console.log("activeFilters", activeFilters);

  return (
    <>
    {filterData.titles && <FilterSelect id={"event"} values={filterData.titles.filter((title:string): title is string => title !== undefined)} onChangeHandler={onChangeHandler} />}
    {filterData.places && <FilterSelect id={"lloc"} values={filterData.places.filter((place:string): place is string => place !== undefined)} onChangeHandler={onChangeHandler} />}
    {filterData.years && <FilterSelect id={"any"} values={filterData.years.filter((year:string): year is string => year !== undefined)} onChangeHandler={onChangeHandler} />}  
    {keywords && keywords?.length > 0 && <FilterSelect id={"keywords"} values={keywords.filter((keyword:string): keyword is string => keyword!== undefined)} onChangeHandler={onChangeHandler} />}
    <button onClick={()=> resetFilters()}><ResetFilters /></button>    
    </>
  )
}

export default Filters