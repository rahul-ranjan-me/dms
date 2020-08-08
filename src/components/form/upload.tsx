import React, { Fragment, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import properties from '../../properties'
import uploadImg from '../../images/upload.png'
import doneImg from '../../images/done.png'
import removeImg from '../../images/remove.png'

import './form.scss'

interface Upload{
  props: {
    attachments: any[],
    className: string,
    onUpload: Function,
    onRemove: Function
  }
}

const Upload = (props) => {
  const AddFile = (file:File, idx:Number, onRemove:Function) => {
    const { name } = file
    return (
      <div key={`${name}-${idx}`} className="attachment">
        <span>{name}</span>
        <span onClick={() => onRemove(idx)}>
          <img src={removeImg} alt="remove" />
        </span>
      </div>
    )
  }

  const { attachments, className, onUpload, onRemove } = props
      , { getRootProps, getInputProps, isDragActive, open } = useDropzone({
          onDrop: useCallback((onUpload), [])
        , accept: properties.supportedTypes.join(',')
        , noClick: true
        , noKeyboard: true     
        })
  
  return (
    <div className={`file upload ${className} ${isDragActive && 'drag-active'}`} {...getRootProps()}>
      { attachments.length ? (
        <Fragment>
          <div className="info">
            <img className="img" src={doneImg} alt="Document selected" />
            <div className="content">
              <div className="description">Thank you, You've selected the following document</div>
              <div className="sub-description">
                { attachments.map((file:File, idx:Number) => AddFile(file, idx, onRemove))}
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <input {...getInputProps()} />
          <div className="info">
            <img className="img" src={uploadImg} alt="document" />
            <div className="content">
              <div className="description">Drag and drop or select your completed form here</div>
              <div className="sub-description">Single file in Word, PDF or XLSX format.</div>
              <button type="button" className="btn btn-primary" onClick={open}>Choose file</button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export { Upload }