import React, {useContext, useState, Fragment} from 'react'
import GlobalContext from '../../components/globalState/globalContext'
import properties from '../../properties'
import {AnchorLink} from '../actionButton/index'

import './docUploadProgress.scss'

const DocUploadProgress = () => {
  const { documentData } = useContext(GlobalContext)
  const [ showProgress, setShowProgress ] = useState('hide')

  const switchState = () => {
    if(showProgress === 'hide'){
      setShowProgress('show')
    }else{
      setShowProgress('hide')
    }
  }

  const progressIndicator = () => {
    const { name, isUploadedProgress, previewUrl } = documentData[documentData.length-1]
    return (
      <Fragment>
        <div className="file-upload-progress-button" onClick={() => switchState('show')}>Show upload progress</div>

        <div className={`upload-progress-widget ${showProgress}`}>
          <span className="hide-progress" onClick={() => switchState('hide')}>X</span>
          <h2>File upload progress indicator</h2>
          
          <h3>File Name: <span>{name}</span></h3>
          { isUploadedProgress !== 100 ?
            showLoader(isUploadedProgress) :
            <a href={`${properties.apiUrl}${previewUrl}`} target="_blank" className="btn btn-primary">Download File</a>
          }
        </div>
      </Fragment>
    )
  }

  const showLoader = (isUploadedProgress) => {
    return(
      <div className="progress-indicator">
        <span className="outer">
          <span className="inner" style={{width:`${isUploadedProgress}%`}}></span>
          <em>{isUploadedProgress}%</em>
        </span>    
      </div>
    )
  }

  return(
    <div>
      {documentData && documentData.length ? progressIndicator() : null}
    </div>
  )
}

export default DocUploadProgress