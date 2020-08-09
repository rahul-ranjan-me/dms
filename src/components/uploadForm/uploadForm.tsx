import React, { useContext } from 'react'
import GlobalContext from '../globalState/globalContext'
import Form from '../form/form'
import { xhrPost } from '../../xhr'

interface UploadForm {}

const UploadForm = () => {
  const { documentData, setDocumentData, setUploadProgress } = useContext(GlobalContext)
  let tempData:any = {}
  const config = {
    onUploadProgress: function(progressEvent) {
      let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      tempData.isUploadedProgress = percentCompleted
      tempData.previewUrl = [Math.random()]
      setDocumentData([...documentData, tempData])
    },
    headers: {'Content-Type': 'multipart/form-data' }
  }

  const uploadDoc = (docData) => {
    const { name, description } = docData
        , uploadDate:any = new Date().valueOf()
        , bodyFormData = new FormData()
    tempData = {
      id: Math.floor(Math.random()*90000) + 10000,
      name: name,
      description: description,
      uploadDate: uploadDate,
      isUploadedProgress: 0,
      previewUrl: null,
    }
  
    uploadFormMetaData.forEach((field) => {
      const {name, type} = field

      if(type === 'file'){
        const files = docData[name]
        if(docData[name]){
          files.forEach((file:string, index:Number) => {
            bodyFormData.append(name+index, file);
          })
          bodyFormData.set('uploadedDate', uploadDate);
        }
      }else{
        bodyFormData.set(name, docData[name]);
      }

    })
    setUploadProgress(true)
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