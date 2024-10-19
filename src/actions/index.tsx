import fs from 'fs';
import { join as pathJoin } from 'path';
import { TFolder } from '@/dataModel/directory';
import { TImage } from '@/dataModel/image';

// import { TImage } from '@/dataModel/image';
// import { getImagesList } from './galleryList';
// import { getUniqueKeywords } from './galleryList';
// eslint-disable-next-line @typescript-eslint/no-require-imports
// const ExifTool = require("exiftool-vendored").ExifToolimport { type } from '../store/index';


export function getFolderData(item: string, type: string = 'directory'): TFolder {
  const folderDataRaw = item.split('-');
  const title = folderDataRaw[0] || "";
  const place = folderDataRaw[1] || "";
  const date = folderDataRaw[2] || "";
  const month = date && date.split('_')[0] || "";
  const year = date && date.split('_')[1] || "";

  const folderData: TFolder = {
    type: type,
    name: item,
    title: title,
    place: place,
    date: {
      year: year,
      month: month
    }
  }

  return folderData
}

export function getFilterData(images: TImage[] = []) {

  const titles = [...new Set(images.map((item) => item.title))].sort();
  const places = [...new Set(images.map((item) => item.place))].sort();
  const months = [...new Set(images.map((item) => item.date?.month))].sort();
  const years = [...new Set(images.map((item) => item.date?.year))].sort();

  return { titles, places, months, years };
}
// type TImageMetadata = {width: number, height: number, keywords: string[]}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const getImageMetaData = async (imagePath: string): Promise<TImageMetadata> => {
//   // const exiftool = new ExifTool({ taskTimeoutMillis: 5000 });
//   const imageData = exiftool
//   .read(imagePath)
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   .then((tags:any) => {
//     console.log("tags.Keywords >>", tags.Keywords)
//     const imageData = { width: tags.ImageWidth, height: tags.ImageHeight, keywords: tags.Keywords }
//     return imageData;
//   })
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   .catch((err:any) => console.error("Something terrible happened: ", err));

//   exiftool
//     .end();

//     // console.log("imageData >>", imageData);

//     return imageData || {width: 0, height: 0, keywords: []};
// }

export function getFoldersList(dirName: string): TFolder[] {
  const filepath = pathJoin(process.cwd(), `public/${dirName}`);
  if (fs.existsSync(filepath)) {
    const folders = fs.readdirSync(filepath).filter(folder => !folder.startsWith('.'));;
    const folderList = folders.map((folder) => {
      const curPath = pathJoin(filepath, folder);
      if (fs.lstatSync(curPath).isDirectory()) {
        return getFolderData(folder);
      }
    });

    return folderList as TFolder[];
  }
  return [];
}

export function getImageList(dirName: string): string[] {

  const filepath = pathJoin(process.cwd(), `public/gallery-images/${dirName}`);
  if (fs.existsSync(filepath)) {
    const images = fs.readdirSync(filepath).filter(image => !image.startsWith('.'));

    return images
  }
  return [];
}

// export async function getFullGalleryList() {
//   const folderList = getFoldersList('gallery-images');
//   const galleryList = folderList.map((folder) => {
//     const images = getImageList(folder.name);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const imagesWithMetaData: TImage[] = [];
//     Promise.all(images.map(async (image) => {
//       const curPath = pathJoin(process.cwd(), `public/gallery-images/${folder.name}/${image}`);
//       // const imageFilterData = 
//       const imageMetadata: TImageMetadata = await getImageMetaData(curPath)
//       if (!imageMetadata) return;

//       imagesWithMetaData.push({
//         ...imageMetadata, 
//         name: image,
//         type: 'file'31
//       })
//     }));
//     return {
//       ...folder,
//       images: imagesWithMetaData
//     }
//   });

//   return galleryList;
// }

// export async function getInitialData() {
//     const images = getImagesList();    
//     const filterData = getFilterData();
//     try {
//       const keywords= await getUniqueKeywords();
//       return {images, filterData, keywords};
//     } catch (error) {
//       console.log("error >>", error);
//       return {};
//     }
// }

