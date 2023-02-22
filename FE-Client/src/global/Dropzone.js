import React, { useState, useCallback } from 'react'
import {useDropzone} from 'react-dropzone'

function Dropzone() {

  const [selectedImages, setSelectedImages]  = useState()

  const onDrop = useCallback(acceptedFiles => {
    setSelectedImages(acceptedFiles.map(file => 
        Object.assign(file, {
            preview:URL.createObjectURL(file)
        })
    ))
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const selected_images = selectedImages?.map(file=>(

    <div>
        <img src={file.preview}  style={{width:"320px", height:"320px", cursor: "pointer", padding:"27px"}} alt="" />
    </div>

  ))

  return (
    <div>
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        
          <p>Drag 'n' drop your image here, or click to select image</p>
      }
    </div>
    {selected_images}
    </div>
  )
}
export default Dropzone