import React, { useContext, useState, Fragment, useEffect } from 'react'
import GlobalContext from '../globalState/globalContext'
import properties from '../../properties'

import './docUploadProgress.scss'

interface DocUploadProgress {

}

const DocUploadProgress = () => {
  const { documentData, uploadProgress, setUploadProgress } = useContext(GlobalContext)
      , [ showProgress, setShowProgress ] = useState('hide')
   
  useEffect(() => {
    if(documentData && uploadProgress){
      const { isUploadedProgress } = documentData[documentData.length-1]
      if(isUploadedProgress === 100){
        setShowProgress('show')
        window.setTimeout(() => {
          setShowProgress('hide')
          setUploadProgress(false)
        }, properties.progressNotificationTimeout)
      }
    }
  })

  const switchState = () => {
    if(showProgress === 'hide'){
      setShowProgress('show')
    }else{
      setShowProgress('hide')
    }
  }

  const getPreviewUrls = (url:String, i:Number) => {
    return (
      <Fragment key={`Download file ${i}`} >
        <a target="_blank" rel="noopener noreferrer" href={`${properties.apiUrl}${url}`} className="btn btn-primary download-btn">Download file {i}</a>
      </Fragment>
    )
  }

  const progressIndicator = () => {
    const { name, isUploadedProgress, previewUrl } = documentData[documentData.length-1]
    return (
      <Fragment>
        <div className="file-upload-progress-button" onClick={() => switchState()}>Show upload progress</div>

        <div className={`upload-progress-widget ${showProgress}`}>
          { !uploadProgress && <span className="hide-progress" onClick={() => switchState()}>X</span> }
          <h2>File upload progress indicator</h2>
          
          <h3>File Name: <span>{name}</span></h3>
          { isUploadedProgress !== 100 ?
            showLoader(isUploadedProgress) : 
            previewUrl.map(getPreviewUrls)
          }
        </div>
      </Fragment>
    )
  }

  const showLoader = ( isUploadedProgress:Number ) => {
    return(
      <div className="progress-indicator">
        <span className="outer">
          <span className="inner" style={{width:`${isUploadedProgress}%`}}></span>
          <em>{ isUploadedProgress }%</em>
        </span>    
      </div>
    )
  }

  return(
    <Fragment>
      { uploadProgress && progressIndicator() }
    </Fragment>
  )
}

export default DocUploadProgress