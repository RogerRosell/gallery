import { TImage } from '@/dataModel/image';

export const getFilterData = (images: TImage[] = []) => {

  const titles = [...new Set(images.map((item) => item.title))].sort();
  const places = [...new Set(images.map((item) => item.place))].sort();
  const months = [...new Set(images.map((item) => item.date?.month))].sort();
  const years = [...new Set(images.map((item) => item.date?.year))].sort();

  return { titles, places, months, years };
}

//create a functon that filters an array of images by title, place, month and year
export const filterImages = (images: TImage[], filters: { event: string, lloc: string, any: string }): TImage[] => {
  const filteredImages = images.filter(image =>
    (!filters.event || image.title === filters.event) &&
    (!filters.lloc || image.place === filters.lloc) &&
    // (!filters.month || image.date?.month === filters.month) &&
    (!filters.any || image.date?.year === filters.any)
  );
  return filteredImages;
};

export const filterImagesByKeywords = (images: TImage[], keywords: string[]): TImage[] => {
  if (keywords.length === 0) return images;
  const filteredImages = images.filter(image => 
    image.keywords && keywords.some(keyword => image.keywords?.includes(keyword))
  );
  return filteredImages;
};