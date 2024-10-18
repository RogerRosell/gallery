import fs from 'fs';
import { join as pathJoin } from 'path';
import { TFolder } from '@/dataModel/directory';
import { TImage } from '@/dataModel/image';

// import { TImage } from '@/dataModel/image';
// import { getImagesList } from './galleryList';
// import { getUniqueKeywords } from './galleryList';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ExifTool = require("exiftool-vendored").ExifTool

export function getFolderData(item: string) {
  const folderDataRaw = item.split('-');
  const title = folderDataRaw[0] || "";
  const place = folderDataRaw[1] || "";
  const date = folderDataRaw[2] || "";
  const month = date && date.split('_')[0] || "";
  const year = date && date.split('_')[1] || "";

  const folderData: TFolder = {
    name: item,
    type: 'directory',
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getImageMetaData = async (imagePath: string): Promise<any> => {
  // const exiftool = new ExifTool({ taskTimeoutMillis: 5000 })
  ExifTool
    .read(imagePath)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((tags:any) => {
      const imageData = { width: tags.ImageWidth, height: tags.ImageHeight, keywords: tags.Keywords }
      return imageData;
    })    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((err:any) => console.error("Something terrible happened: ", err))
    .end()
}

// async function extractKeywords() {
//   // getFullGalleryList().then(tree => console.log(JSON.stringify(tree)));
//   // try {
//   //   const tree = await getFullGalleryList()
//   //   .then (tree => console.log(JSON.stringify(tree, null, 2)))
//   //   // console.log("galleryData >>", JSON.stringify(tree, null, 2))
//   //   // const keywords = galleryData.map((element) => {
//   //   //   console.log("element >>", element)
//   //   //   // if (element.type === 'file') {
//   //   //   //   return element.metadata.keywords;
//   //   //   // }
//   //   // });
//   //   // const allDirectories = galleryData.filter((element) => element.type === 'directory');
//   //   // const allImages = galleryData.filter((element) => element.type === 'file');
//   //   // console.log("allImages >>", allImages)
//   // } catch (err) {
//   //   console.log("Error >>", err)
//   // }


//   // console.log("keywords_ >>", keywords_)
//   // return keywords;
// }

// export async function getKeywordsList() {
//   const gallery = getFullGalleryList();
//   // console.log("gallery >>", gallery)
//   // let keywords_ = [];
//   const folderList = getFoldersList('gallery-images');
//   const keywords = await extractKeywords(folderList[0].name);
//   // console.log("keywords >>", keywords)
//   // const allImagesList = folderList.map((folder) => getImageList(folder.name));

//   // console.log("allImagesList >>", allImagesList)

//   // console.log("folderList >>", folderList)
//   // let keywords = [];
//   // folderList.map(async (folder) => {     
//   //   const folderImagesList = getImageList(folder.name);
//     // const keywords = await Promise.all(allImagesList.map(async (image) => {
//     //   const curPath = pathJoin(process.cwd(), `public/gallery-images/${folder.name}/${image}`);
//     //   const imageMetadata = await getImageMetaData(curPath);
//     //   if (imageMetadata?.keywords && Array.isArray(imageMetadata.keywords)) {
//     //     let keys: string[] = [];
//     //     imageMetadata.keywords.forEach(element => {
//     //       keywords_.push(element);
//     //     });
//     //     console.log("keys >>", keys)
//     //     // const keys = imageMetadata.keywords.map((keyword) => keyword)
//     //     // console.log("imageMetadata.keywords >>", imageMetadata.keywords);
//     //     // keywords_.push(...keys);
//     //     return ({...keys});
//     //   }
//     // }));
//   //   // console.log("keywords >>", keywords)
//   //   // folderImagesList.map(async (image) => {
//   //   //   const curPath = pathJoin(process.cwd(), `public/gallery-images/${folder.name}/${image}`);
//   //   //   const imageMetadata = await getImageMetaData(curPath);
//   //   //   if (imageMetadata?.keywords && Array.isArray(imageMetadata.keywords)) {
//   //   //     console.log(imageMetadata.keywords)
//   //   //     // const newKeywords = [...new Set([...keywords, ...imageMetadata.keywords])];  
//   //   //     // console.log("imageMetadata.keywords >>",  imageMetadata.keywords)
//   //   //     keywords_.push(...imageMetadata.keywords);
//   //   //     // imageMetadata.keywords.map((keyword) => {
//   //   //     //   // console.log("keyword >>", keyword)  
//   //   //     //   keywords.push(keyword);
//   //   //     //   //  return {keyword};
//   //   //     // })
//   //   //     // return (...imageMetadata.keywords);
//   //   //     // const newKeywords = [...keywords, ...imageMetadata.keywords];    
//   //   //     // console.log("newKeywords >>", ...imageMetadata.keywords) 
//   //   //   }
//   //   // });
//   //   // const imageList = getImageList(folder.name);
//   //   // imageList.map(async (image) => {
//   //   //   const curPath = pathJoin(filepath, image);
//   //   //   const imageMetadata = await getImageMetaData(curPath);
//   //   //   if (imageMetadata?.keywords && Array.isArray(imageMetadata.keywords)) {
//   //   //     // const newKeywords = [...new Set([...keywords, ...imageMetadata.keywords])];  
//   //   //     // console.log("imageMetadata.keywords >>",  imageMetadata.keywords)
//   //   //     keywords_.push(...imageMetadata.keywords);
//   //       // imageMetadata.keywords.map((keyword) => {
//   //       //   // console.log("keyword >>", keyword)  
//   //       //   keywords.push(keyword);
//   //       //   //  return {keyword};
//   //       // })
//   //       // return (...imageMetadata.keywords);
//   //       // const newKeywords = [...keywords, ...imageMetadata.keywords];    
//   //       // console.log("newKeywords >>", ...imageMetadata.keywords) 

//   //   });
//     // console.log("allKeywords >>", allKeywords);

//     // console.log("keywords_ >>", keywords_)
//     return keywords;
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

export async function getFullGalleryList() {
  const folderList = getFoldersList('gallery-images');
  const galleryList = folderList.map((folder) => {
    const images = getImageList(folder.name);
    const imagesWithMetaData: TImage[] = [];
    Promise.all(images.map(async (image) => {
      const curPath = pathJoin(process.cwd(), `public/gallery-images/${folder.name}/${image}`);
      // const imageFilterData = 
      const imageMetadata = await getImageMetaData(curPath)
      if (!imageMetadata) return;

      imagesWithMetaData.push({
        ...imageMetadata, name: image,
        type: 'file'
      })
    }));
    return {
      ...folder,
      images: imagesWithMetaData
    }
  });

  return galleryList;
}

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

