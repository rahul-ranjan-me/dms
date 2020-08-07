  
import React, { useState } from 'react'
import GlobalContext from './globalContext'
const GlobalState = (props) => {
  const [ documentData, setDocumentData ] = useState([])
  
  return(
    <GlobalContext.Provider value={{ 
      documentData: documentData,
      setDocumentData: setDocumentData
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalState