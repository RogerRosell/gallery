import fs from 'fs';
import path from 'path';
import { TDirectoryItem } from '../app/types';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const exiftool = require("exiftool-vendored").exiftool
// import { Image } from 'next/image';

//  const getImageData = async (imagePath: string) => {
//     const tags = await exiftool.read(imagePath);
//     if (!tags) {
//       return null;
//     }
//     const imageData = {width: tags.ImageWidth, height: tags.ImageHeight, keywords: tags.Keywords}
//     return imageData;
// }

// async function readDirectory(dirPath: string): Promise<TDirectoryItem[]> {
//   // exiftool
//   // .version()
//   // .then((version) => console.log(`We're running ExifTool v${version}`))
//   const items = fs.readdirSync(dirPath);
//   const promises = items.map(async item => {
//     const fullPath = path.join(dirPath, item);
//     const isDirectory = fs.statSync(fullPath).isDirectory();
//     if (isDirectory) {
//       const itemData = item.split('-');
//       const title =   itemData[0];
//       const place =  itemData[1];
//       const date =  itemData[2];
//       const month = date && date.split('_')[0] ;
//       const year = date && date.split('_')[1];
//       return {
//         name: item,
//         type: 'directory',
//         children: readDirectory(fullPath),
//         title: title,
//         place: place,
//         date: {
//           year: year,
//           month: month
//         }
//       };
//     } else if (/\.(jpg|jpeg|png|gif)$/.test(item)) {
//       const imageData = await getImageData(fullPath); 
//       if(!imageData) {
//         return null;
//       }   
//       if (imageData) {
//         return {
//           name: item,
//           type: 'file',
//           keywords: imageData?.keywords,
//           width: imageData?.width,
//           height: imageData?.height
//         }
//       }
//     } else {
//       return null as unknown as TDirectoryItem; // Explicitly cast null to TDirectoryItem
//     }
//   });

//   const results = await Promise.all(promises);
//   return results.filter((item): item is TDirectoryItem => item !== null); // Filter out null values
// }