import { TImage } from '@/dataModel/image';

export const filterImagesByKeywords = (images: TImage[], keywords: string[]): TImage[] => {
  if (keywords.length === 0) return images;
  const filteredImages = images.filter(image => 
    image.keywords && keywords.some(keyword => image.keywords?.includes(keyword))
  );
  return filteredImages;
};