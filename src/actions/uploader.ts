"use server";

import fs from 'fs';
// import { Writable } from 'stream';

const uploadFile = async (imageFile: { name: string }, imageBuffer: Buffer) => {
  const filePath = `src/imageLibrary/${imageFile.name}`;

  try {
    await fs.promises.writeFile(filePath, imageBuffer);
    return true;
  } catch (err) {
    console.log("error >> ", err);
    return false;
  } 
}

export async function handleUpload(formData: FormData) {
  const imageFiles = formData.getAll('image');
  // console.log("imageFiles", imageFiles);
  const allowedFiles = ['png', 'jpeg', 'jpg', 'gif'];
  const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

  imageFiles.forEach(async (item) => {
    const imageFile = item as File;
    // console.log("imageFile", imageFile.name);
    const fileExtension = imageFile.name.slice(
      ((imageFile.name.lastIndexOf('.') - 1) >>> 0) + 2
    );

    if (!allowedFiles.includes(fileExtension) || !allowedFileTypes.includes(imageFile.type)) {
      throw Error('Invalid file');
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const res = await uploadFile({ name: imageFile.name }, imageBuffer);
    if (res) {
      console.log(`${imageFile.name} uploaded successfully`);
    } else {
      console.log(`${imageFile.name} upload failed`);
    }
  })
//   const imageFile = formData.get('image') as File;
//   // const imageBlob = formData.get('image') as Blob;

//   const fileExtension = imageFile.name.slice(
//     ((imageFile.name.lastIndexOf('.') - 1) >>> 0) + 2
// );

// if (!allowedFiles.includes(fileExtension) || !allowedFileTypes.includes(imageFile.type)) {
//   throw Error('Invalid file');
// }
// // const imageBuffer = fs.readFileSync(`src/imageLibrary/${imageFile.name}`);

//   const arrayBuffer = await imageFile.arrayBuffer();
//   const imageBuffer = Buffer.from(arrayBuffer);

//   uploadFile({ name: imageFile.name }, imageBuffer);
  // fs.createWriteStream(`src/imageLibrary/${imageFile.name}`).write(imageBuffer);
}