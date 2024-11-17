import { TImage } from '@/dataModel/image';

export const getFilterData = (images: TImage[] = []) => {

  const titles = [...new Set(images.map((item) => item.title))].sort();
  const places = [...new Set(images.map((item) => item.place))].sort();
  const fullDates = [...new Set(images.map((item) => item.date?.fullDate))].sort();
  const months = [...new Set(images.map((item) => item.date?.month))].sort();
  const years = [...new Set(images.map((item) => item.date?.year))].sort();

  console.log("fullDates >>", fullDates);

  return { titles, places, fullDates, months, years };
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getImagesList = (tree:any) => {
  const images: TImage[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tree.forEach((item: TImage | any) => {
    item.children.forEach((element: TImage) => {
      
      if (element.type && element.type === 'image' || element.type === 'file') {
        images.push(element);                 
      }
    });     
  });
  // console.log("images", images);
  return images;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUniqueKeywords = (tree:any) => {
    const keywords_: string[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    tree.forEach((item: TImage | any) => {
      if (item.type === 'image' && item.keywords) {
        if (typeof item.keywords === 'string') keywords_.push(item.keywords);
        if (Array.isArray(item.keywords)) keywords_.push(...item.keywords);                  
      } 
    });
    const uniqueKeywords: string[] = [...new Set(keywords_)].sort();  
    return uniqueKeywords;
}

export function getImageFilterData(item: string) {
  const imageFilterDataRaw = item.split('-');
  const title = imageFilterDataRaw[0] || "";
  const place = imageFilterDataRaw[1] || "";
  const date = imageFilterDataRaw[2] || "";
  const month = date && date.split('_')[0] || "";
  const year = date && date.split('_')[1] || "";

  console.log("date >>", date);

  const imageFilterData: TImage = {
    name: item,
    type: 'file',
    title: title,
    place: place,
    date: {
      fullDate: date,
      year: year,
      month: month
    }
  }

  return imageFilterData
}