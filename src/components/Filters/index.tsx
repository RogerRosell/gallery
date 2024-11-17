'use client';

import { useState } from 'react';
import { FilterSelect } from '@/components/FilterSelect';
import { useFAlbumStore } from '@/store';
import ResetFilters from '@/components/SVG/ResetFilters';
import { filterImagesByKeywords, getFilterData, filterImages, getUniqueKeywords } from '@/lib/filterUtils';
import { KeywordsList } from '@/components/KeywordsList';
import { TImage } from '@/dataModel/image';


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
  const setKeywords = useFAlbumStore(state => state.setKeywords);
  const setFilteredImages = useFAlbumStore(state => state.setFilteredImages);
  const resetFilteredImages = useFAlbumStore(state => state.resetFilteredImages);

  const [activeFilters, setActiveFilters] = useState<activeFilters>({
    event: "",
    lloc: "",
    any: "",
    keywords: []
  });

  const updateImagesAndFilters  = (images: TImage[], filters: activeFilters) => {
    setActiveFilters({ ...filters });
      setFilteredImages(images);
      setFilterData(getFilterData(images));
      setKeywords(getUniqueKeywords(images));
  }

  const getUpdatedKeywords = (value: string) => activeFilters.keywords.includes(value) ? activeFilters.keywords.filter(keyword => keyword !== value) : [...activeFilters.keywords, value]

  const onChangeHandler = (id: string, value: string) => {
    const newActiveFilters = id === "keywords" ? { ...activeFilters, [id]: getUpdatedKeywords(value) } : { ...activeFilters, [id]: value };
    const newFilteredImages = id === "keywords" ? filterImagesByKeywords(filteredImages, getUpdatedKeywords(value)) : filterImages(filteredImages, newActiveFilters);
    updateImagesAndFilters(newFilteredImages, newActiveFilters);
  }

  const removeKeyword = (keyword: string) => {
    const updatedKeywords = activeFilters.keywords.filter(k => k !== keyword);
    const newFilteredImages = filterImagesByKeywords(filteredImages, updatedKeywords);
    setActiveFilters({ ...activeFilters, keywords: updatedKeywords });
    setFilteredImages(newFilteredImages);
    setFilterData(getFilterData(newFilteredImages));
    setKeywords(getUniqueKeywords(newFilteredImages));
  }

  const resetFilters = () => {
    setActiveFilters({
      event: "",
      lloc: "",
      any: "",
      keywords: []
    });
    resetFilteredImages();
    setFilterData(getFilterData(allImages));
    setKeywords(getUniqueKeywords(allImages));

    return true;
  }

  return (
    <>
      {filterData.titles && <FilterSelect id={"event"} value={activeFilters.event} values={filterData.titles.filter((title: string): title is string => title !== undefined)} onChangeHandler={onChangeHandler} />}
      {filterData.places && <FilterSelect id={"lloc"} value={activeFilters.lloc} values={filterData.places.filter((place: string): place is string => place !== undefined)} onChangeHandler={onChangeHandler} />}
      {filterData.years && <FilterSelect id={"any"} value={activeFilters.any} values={filterData.years.filter((year: string): year is string => year !== undefined)} onChangeHandler={onChangeHandler} />}
      {keywords && keywords?.length > 0 &&
        <div>
          <FilterSelect id={"keywords"} values={keywords.filter((keyword: string): keyword is string => keyword !== undefined)} onChangeHandler={onChangeHandler} />
          {activeFilters.keywords.length > 0 &&
            <KeywordsList keywords={[...activeFilters.keywords]} removeKeyword={removeKeyword} />
          }
        </div>}
      <button onClick={() => resetFilters()}><ResetFilters /></button>
    </>
  )
}

export default Filters