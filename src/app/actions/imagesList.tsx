import fs from 'fs';
import path from 'path';
import { TDirectoryItem } from '../types';
// import * as ExifReader from 'exifreader';
// import exiftool from 'exiftool-vendored';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const exiftool = require("exiftool-vendored").exiftool
// import { Image } from 'next/image';


export const getImageExif = async (imagePath: string) => {
    const tags = await exiftool.read(imagePath);
    // const str: string = tags;
    console.log("Keywords", tags.Keywords);
    console.log("width", tags.ImageWidth);
    console.log("height", tags.ImageHeight);
  // exiftool
  //   .read(imagePath)
  //   .then((tags) => 
  //     console.log(
  //       `Tags: ${tags["Image Width"]}x${tags["Image Height"]}, Date: ${tags.MetadataDate["value"]}`
  //     )
  //   )
  //   .catch((err) => console.error("Something terrible happened: ", err))
  // const tags = await ExifReader.load(imagePath);
  // console.log("width", tags['Image Width']);
  // console.log("height", tags['Image Height']);
  // console.log("date", tags.MetadataDate['value']);
  // console.log("tags", tags);
}

function readDirectory(dirPath: string): TDirectoryItem[] {
  // exiftool
  // .version()
  // .then((version) => console.log(`We're running ExifTool v${version}`))
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
      if (item === 'scans_estiu_24_254.jpg') {
        getImageExif(fullPath);
      }
      
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