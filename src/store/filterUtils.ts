import { TImage } from '@/dataModel/image';

export const getFilterData = (images: TImage[] = []) => {

  const titles = [...new Set(images.map((item) => item.title))].sort();
  const places = [...new Set(images.map((item) => item.place))].sort();
  const months = [...new Set(images.map((item) => item.date?.month))].sort();
  const years = [...new Set(images.map((item) => item.date?.year))].sort();

  return { titles, places, months, years };
}

export const filterImagesByKeywords = (images: TImage[], keywords: string[]): TImage[] => {
  if (keywords.length === 0) return images;
  const filteredImages = images.filter(image => 
    image.keywords && keywords.some(keyword => image.keywords?.includes(keyword))
  );
  return filteredImages;
};