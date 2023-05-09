// ** React Imports
import { useState, Fragment, useCallback } from 'react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import axios from "axios";
const FileUploaderSingle = ({ files, setFiles }) => {
  // ** State

  /* const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    onDrop: acceptedFiles => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
  
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
        // Do whatever you want with the file contents
          const binaryStr = reader.result
          console.log(binaryStr)
        }
        reader.readAsArrayBuffer(file)
      })

      console.log(acceptedFiles)
      setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append('image', files[0]);
      }
      axios.post('http://localhost:5000/book/addbook', file.filenames, {
        headers: { 'Content-type': 'multipart/form-data' }
      }).then(response => {
        const { file: filenames } = response;
        onChange(prev => {
          return [...prev, ...filenames];
        });
      })
    }
  }) */
  
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageURL, setImageUrl] = useState();


  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles)
    acceptedFiles.forEach((file) => {
      setSelectedImages((prevState) => [...prevState, file]);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  // Add this
  const onUpload = async () => {
    const formData = new FormData();
    console.log(selectedImages)


    formData.append("file", selectedImages[0]);
    formData.append("upload_preset", "bfy1gsk5");


    console.log(formData)
    const options = {
      method: "POST",
      body: formData,
     };
    
    return fetch(`https://api.cloudinary.com/v1_1/dsawrgwfd/image/upload`, options)
      .then((res) => res.json())
      .then((res) => {

        //!
        setImageUrl("res.secure_url");
      })
      .catch((err) => console.log(err));
  };

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    } else {
      return <FileText size='28' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = selectedImages.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Single</CardTitle>
      </CardHeader>
      <CardBody>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className='d-flex align-items-center justify-content-center flex-column'>
            <DownloadCloud size={64} />
            <h5>Drop Files here or click to upload</h5>
            <p className='text-secondary'>
              Drop files here or click{' '}
              <a href='/' onClick={e => e.preventDefault()}>
                browse
              </a>{' '}
              thorough your machine
            </p>
          </div>
        </div>
        {selectedImages.length ? (
          <Fragment>
            <ListGroup className='my-2'>{fileList}</ListGroup>
            <div className='d-flex justify-content-end'>
              <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                Remove All
              </Button>
              <Button type="button" color='primary' onClick={onUpload}>Upload Files</Button>
            </div>
          </Fragment>
        ) : null}
      </CardBody>
    </Card>
  )
}

export default FileUploaderSingle
