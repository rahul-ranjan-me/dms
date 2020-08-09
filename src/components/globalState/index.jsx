  
import React, { useState } from 'react'
import GlobalContext from './globalContext'
const GlobalState = (props) => {
  const [ documentData, setDocumentData ] = useState([])
  const [ uploadProgress, setUploadProgress ] = useState(false)
  
  return(
    <GlobalContext.Provider value={{ 
      documentData: documentData,
      setDocumentData: setDocumentData,
      uploadProgress: uploadProgress,
      setUploadProgress: setUploadProgress
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalState