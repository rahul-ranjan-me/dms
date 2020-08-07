import React, {useContext} from 'react'
import GlobalContext from '../../components/globalState/globalContext'
import Form from '../form/form'
import {xhrPost} from '../../xhr'

const UploadForm = (props) => {
  const { documentData, setDocumentData } = useContext(GlobalContext)
  let tempData = {}
  const config = {
    onUploadProgress: function(progressEvent) {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      tempData.isUploadedProgress = percentCompleted
      tempData.previewUrl = Math.random()
      const abc = [...documentData, tempData]
      setDocumentData([...abc])
    },
    headers: {'Content-Type': 'multipart/form-data' }
  }

  const uploadDoc = (docData) => {
    const { name, description, fileName } = docData
    const { name:filename } = fileName[0]
    const uploadDate = new Date().valueOf()
    tempData = {
      id: Math.floor(Math.random()*90000) + 10000,
      name: name,
      description: description,
      uploadDate: uploadDate,
      isUploadedProgress: 0,
      previewUrl: null,
      type: filename.split('.').pop().toLowerCase()
    }
   
    const bodyFormData = new FormData();
    uploadFormMetaData.forEach((field) => {
      const {name, type} = field
      if(type === 'file'){
        if(docData[name]){
          bodyFormData.append(name, docData[name][0]); 
          bodyFormData.set('uploadedDate', uploadDate);
        }
      }else{
        bodyFormData.set(name, docData[name]);
      }
    })
    
    xhrPost('/document', bodyFormData, config).then((res) => {
      setDocumentData([...res.data.documents])
    })
    
  }

  const uploadFormMetaData = [
    {
      type: 'text'
    , name: 'name'
    , label: 'Name'
    , required: true
    }
  , {
      type: 'textarea'
    , name: 'description'
    , label: 'Description'
    , required: true
    }
  , {
      type: 'file'
    , name: 'fileName'
    , label: 'UploadFile'
    }
  ]

  return (
    <div className="upload-form">
      <h1>Upload new file</h1>
      <Form fields={uploadFormMetaData} onSubmit={uploadDoc} />
    </div>
  )
}

export default UploadForm