import { Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone';
//


const AddImages = () => {
  const [files, setFiles] = useState([])

  const onDrop = useCallback((acceptedFiles:any) => { //type any for now
    setFiles(acceptedFiles)
    // console.log(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {'image/*': []}
  })

  

  return (
    <Paper
    sx={{
      cursor:'pointer',
      background:'#fafafa',
      color:'#bdbdbd',
      border:'1px dashed #ccc',
      '&:hover':{border:'1px solid #ccc'}
    }}
    >
      <div style={{padding: '16px'}} {...getRootProps}>
        <input {...getInputProps}/>
        {isDragActive? (
          <p style={{color:'green'}}>Drop files here...</p>
        ): (
          <p>Drag & Drop files or click to select</p>
        )}
        <em>(images with *.jpeg, *png, *jpg extenstion will be accepted)</em>
      </div>
    </Paper>
  )
}

export default AddImages