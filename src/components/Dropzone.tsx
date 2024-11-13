import React, {useState, useRef, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import { handleUpload } from '@/actions/uploader';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


function Previews(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone border h-96'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

function Dropzone() {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<{ [key: string]: { title: string, date: Date, place: string, keywords: string[] } }>({});
  // const {required, name} = props; 

  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    onDrop: (incomingFiles) => {
      if (hiddenInputRef.current) {
        // Note the specific way we need to munge the file into the hidden input
        // https://stackoverflow.com/a/68182158/1068446
        const dataTransfer = new DataTransfer();
        incomingFiles.forEach((v) => {
          dataTransfer.items.add(v);
        });
        hiddenInputRef.current.files = dataTransfer.files;
      }
    }
  });

  const handleInputChange = (filePath: string, field: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [filePath]: {
        ...prevState[filePath],
        [field]: value
      }
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <div className="flex flex-row items-start py-4">
        <div className="flex flex-col gap-4">
        <label>
          Title:
          <input
            type="text"
            value={file.path ? formData[file.path]?.title || '' : ''}
            required
            onChange={(e) => handleInputChange(file.path || '', 'title', e.target.value)}
            className='border'
          />
        </label>
        <label>
          Date:
          <input
            type="text"
            value={file.path ? formData[file.path]?.date || '' : ''}
            required
            onChange={(e) => handleInputChange(file.path || '', 'date', e.target.value)}
            className='border'
          />
        </label>
        <label>
          Place:
          <input
            type="text"
            value={file.path ? formData[file.path]?.place || '' : ''}
            required
            onChange={(e) => handleInputChange(file.path || '', 'place', e.target.value)}
            className='border'
          />
        </label>
        </div>
        <div>
        <label>
          Keywords:
          <input
            type="text"
            value={file.path ? formData[file.path]?.keywords || '' : ''}
            onChange={(e) => handleInputChange(file.path || '', 'keywords', e.target.value)}
            className='border'
          />
        </label>
        </div>
      </div>
    </li>
  ));

  return (
    // <div {...getRootProps()}>
    //   <input type ="file" name={name} required={required} style ={{opacity: 0}} ref={hiddenInputRef}/>
    //   <input {...getInputProps()} />
    //   <button type="button" onClick={open}>
    //     Open File Dialog
    //   </button>
    //   <ul>{files}</ul>
    //   <form onSubmit={handleSubmit}>
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
    <div className="container">
      <div {...getRootProps({className: 'dropzone border h-96'})}>
        {/*
          Add a hidden file input 
          Best to use opacity 0, so that the required validation message will appear on form submission
        */}
        <input type ="file" name="image" required style ={{opacity: 0}} ref={hiddenInputRef}/>
        <input {...getInputProps()} />
        <p>Drag and drop some files here</p>
        <button type="button" onClick={open}>
          Open File Dialog
        </button>
      </div>
      <aside>
        <form onSubmit={handleSubmit}>
        <h4>Files</h4>
        <ul>{files}</ul>
        <button type="submit">Submit2</button>
        </form>
      </aside>
    </div>
  );
}


export const DropzoneForm = () => (
  <div><Dropzone /></div>
)

{/* <form action={handleUpload}>
  <Dropzone />
  <button type="submit">Submit</button>
</form> */}