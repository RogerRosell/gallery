'use client';
// import { handleUpload } from '@/actions/uploader';
// import FileUpload from '@/components/FileUpload';
import { DropzoneForm } from '@/components/Dropzone';

const UploaderPage = () => {
  // const handleFilesUploaded = (files: File[]) => {
  //   files.map((file) => {
  //     console.log(file);
  //     // handleUpload(file);
  //   })            
  //   // Handle uploaded files here
  //   // console.log(files);
  // };

  return (
    <main className="flex h-100 flex-col items-center justify-center p-24">
      <h1>Multiple File Upload</h1>
      {/* <FileUpload onFilesUploaded={handleFilesUploaded} /> */}
      <DropzoneForm />
      {/* <h1 className="text-4xl font-bold pb-24">Upload image</h1>
      <form action={handleUpload}>
        <label htmlFor="image" className="block">
          Image file:
        </label>
        <input type="file" name="image" className="w-96 p-4" />
        <button className="bg-blue-500 text-white p-4 rounded">Submit</button>
      </form> */}
    </main>
  )
}

export default UploaderPage
