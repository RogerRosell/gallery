import sharp from 'sharp';
import { Component } from '@/components/Chart'

const calculateLuminance = (r: number, g: number, b: number): number => {
  return 0.299 * r + 0.587 * g + 0.114 * b;
};

const countPixelsByLuminance = (data: Buffer, info: sharp.OutputInfo) => {
  const luminanceMap: { [key: number]: number } = {};
  const { width, height, channels } = info;

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];

    const luminance = Math.round(calculateLuminance(r, g, b));

    if (luminanceMap[luminance]) {
      luminanceMap[luminance]++;
    } else {
      luminanceMap[luminance] = 1;
    }
  }

  return luminanceMap;
};


const page = () => {
  const imagePath = '/Users/roger/sites/gallery/public/gallery-images/Primeres_fotos-Barcelona-02_2018/Primeres_fotos-Barcelona-02_2018-20.jpg'
  let luminanceMap;
  sharp(imagePath)
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {

     return luminanceMap = countPixelsByLuminance(data, info);
})
.catch(err => {
  console.error("Error processing image >> ", err);
});

// console.log("luminanceMap >> ", luminanceMap);


return <div><Component data={luminanceMap} /></div>
}

export default page