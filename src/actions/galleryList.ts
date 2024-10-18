import fs from 'fs';
import path from 'path';
import { TFolder } from '@/dataModel/directory';
import { TImage } from '@/dataModel/image';
import { getFolderData } from '@/actions/';

async function readDirectoryWithMetadata(dirPath: string): Promise<(TImage | TFolder)[]> {
  const items = fs.readdirSync(dirPath);
  const result: (TImage | TFolder)[] = [];
  // console.log("items from readDirectoryWithMetadata >> ", items);

  for (const item of items) {
    // console.log("item from readDirectoryWithMetadata >> ", item);
    const fullPath = path.join(dirPath, item);
    // console.log("fullPath from readDirectoryWithMetadata >> ", fullPath);
    const isDirectory = fs.statSync(fullPath).isDirectory();

    if (isDirectory) {
      // console.log("isDirectory from readDirectoryWithMetadata >> ", isDirectory);
      
      const folderData = item && getFolderData(item);
      // console.log("folderData from readDirectoryWithMetadata >> ", folderData);
      if (typeof folderData === 'object' && folderData !== null) {
        result.push({
          name: item,
          type: 'directory',
          children: await readDirectoryWithMetadata(fullPath),
          title: folderData.title,
          place: folderData.place,
          date: folderData.date
        });
        // console.log("result from readDirectoryWithMetadata >> ", result);
      } else {
        result.push({
          name: item,
          type: 'directory',
          children: await readDirectoryWithMetadata(fullPath)          
        });
        // console.log("result from readDirectoryWithMetadata >> ", result);
      }
    } else if (/\.(jpg|jpeg|png|gif)$/.test(item)) {
      // console.log("image from readDirectoryWithMetadata >> ", item);
      // const metadata = await getImageMetaData(fullPath);
      
      result.push({
        name: item,
        type: 'file',
        // ...metadata
      });
    }
  }

  return result;
}

export async function getFullGalleryList() {
  const galleryImagesDir = path.join(process.cwd(), 'public', 'gallery-images');
  // console.log("galleryImagesDir >> ", galleryImagesDir);
//   const currentDirectory = path.join(process.cwd(),'public', 'gallery-images');
//   fs.readdir(currentDirectory, function (err, files) {
//     //handling error
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     } 
//     //listing all files using forEach
//     files.forEach(function (file) {
//         // Do whatever you want to do with the file
//         console.log(file); 
//     });
// });
  // process.chdir('../')
  // console.log(path.join(process.cwd(), 'gallery-images'))
  // console.log("galleryImagesDir >> ", galleryImagesDir);
  try {
    const tree = await readDirectoryWithMetadata(galleryImagesDir);
    return tree;
  } catch (err) {
    console.error('Failed to read directory', err);
    return [];
  }
}

// export function getImageFilterData(item: string) {
//   const imageFilterDataRaw = item.split('-');
//   const title = imageFilterDataRaw[0] || "";
//   const place = imageFilterDataRaw[1] || "";
//   const date = imageFilterDataRaw[2] || "";
//   const month = date && date.split('_')[0] || "";
//   const year = date && date.split('_')[1] || "";

//   const imageFilterData: TImage = {
//     name: item,
//     type: 'file',
//     title: title,
//     place: place,
//     date: {
//       year: year,
//       month: month
//     }
//   }

//   return imageFilterData
// }

// export const getImagesList = async () => {
//   const tree = await getFullGalleryList();
//   const images: TImage[] = [];
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   tree.forEach((item: TImage | any) => {
//     item.children.forEach((element: TImage) => {
//       if (element.type === 'file') {
//         const imageFilterData = element.name && getImageFilterData(element.name);
//         const image = Object.assign({}, element, imageFilterData);
//         images.push(image);                 
//       }
//     });     
//   });
  
//   return images;
// };

// export const getUniqueKeywords = async () => {
//   try {
//     const tree = await getFullGalleryList();
//     const keywords_: string[] = [];
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     tree.forEach((item: TImage | any) => {
//       item.children.forEach((element: TImage) => {
//         if (element.type === 'file' && element.keywords) {
//           if (typeof element.keywords === 'string') keywords_.push(element.keywords);
//           if (Array.isArray(element.keywords)) keywords_.push(...element.keywords);                  
//         }
//       });     
//     });
//     const uniqueKeywords: string[] = [...new Set(keywords_)].sort();  
//     return uniqueKeywords;
//   } catch (err) {
//     console.error('Failed to get unique keywords', err);
//     return ["error"];
//   }
// }

