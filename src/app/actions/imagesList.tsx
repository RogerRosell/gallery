import fs from 'fs';
import path from 'path';
import { TDirectoryItem } from '../types';
// import * as ExifReader from 'exifreader';

// export const getImageExif = async (imagePath: string) => {
//   const tags = await ExifReader.load(imagePath);
//   console.log("width", tags['Image Width']);
//   // console.log("height", tags['Image Height']);
//   // console.log("date", tags.MetadataDate['value']);
//   // console.log("tags", tags);
// }

function readDirectory(dirPath: string): TDirectoryItem[] {
  const items = fs.readdirSync(dirPath);
  return items.map(item => {
    const fullPath = path.join(dirPath, item);
    const isDirectory = fs.statSync(fullPath).isDirectory();
    if (isDirectory) {
      return {
        name: item,
        type: 'directory',
        children: readDirectory(fullPath)
      };
    } else if (/\.(jpg|jpeg|png|gif)$/.test(item)) {
      // getImageExif(fullPath);
      return {
        name: item,
        type: 'file'
      };
    } else {
      return null; // Explicitly return null for non-image files
    }
  }).filter((item): item is TDirectoryItem => item !== null); // Filter out null values
}

export function getImagesList() {
  const publicDir = path.join(process.cwd(), 'public/gallery-images');
  try {
    const tree = readDirectory(publicDir);
    return tree;
  } catch (err) {
    console.error('Failed to read directory', err);
    return [];
  }
}