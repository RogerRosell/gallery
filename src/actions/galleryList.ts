import fs from 'fs';
import path from 'path';
import { TFolder } from '@/dataModel/directory';
import { TImage } from '@/dataModel/image';
import { getFolderData } from '@/actions/';
import sharp from 'sharp';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const iptc = require('iptc-reader');

async function readDirectoryWithMetadata(
  dirPath: string
): Promise<(TImage | TFolder)[]> {
  const items = fs.readdirSync(dirPath);
  const result: (TImage | TFolder)[] = [];

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const isDirectory = fs.statSync(fullPath).isDirectory();

    if (isDirectory) {
      const folderData = item && getFolderData(item, 'directory');
      if (typeof folderData === 'object' && folderData !== null) {
        result.push({
          ...folderData,
          children: await readDirectoryWithMetadata(fullPath),
        });
      } else {
        result.push({
          name: item,
          type: 'directory',
          children: await readDirectoryWithMetadata(fullPath),
        });
      }
    } else if (/\.(jpg|jpeg|png|gif)$/.test(item)) {
      const imageData = getFolderData(item, 'image');
      const imageMetaData = await getImageMetadata(fullPath);

      result.push({
        ...imageData,
        ...imageMetaData,
      });
    }
  }

  return result;
}

const getImageMetadata = async (imagePath: string) => {
  const metadata = await sharp(imagePath).metadata();
  const width = metadata.width;
  const height = metadata.height;
  const keywords = metadata.iptc ? iptc(metadata.iptc).keywords : [];

  return { width, height, keywords };
};

export async function getFullGalleryList() {
  const galleryImagesDir = path.join(process.cwd(), 'public', 'gallery-images');
  const directory = path.join(process.cwd(),'src' ,'data', 'images.json');
console.log(directory);
  // const JSON_FILE = path.join(process.cwd(), 'src','data', 'images.json');
  try {
    const tree = await readDirectoryWithMetadata(galleryImagesDir);
    const jsonTree = JSON.stringify(tree);
    try {
      fs.writeFileSync(directory, jsonTree);
      console.log('data.json written correctly');
    } catch (error) {
      console.error(error);

      throw error;
    }
    
    return tree;
  } catch (err) {
    console.error('Failed to read directory', err);
    return [];
  }
}
