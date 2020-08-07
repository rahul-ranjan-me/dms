import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import GlobalContext from '../../components/globalState/globalContext'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {xhrGet} from '../../xhr'
import UploadForm from '../../components/uploadForm/uploadForm'
import properties from '../../properties'
import './document.scss'

export default class Document extends Component{
  constructor(props){
    super(props)
    this.columnDefs = [
      { headerName: "Name", field: "name", width: 137, suppressSizeToFit: true, cellRenderer: this.createLink },
      { headerName: "Description", field: "description", width: 137, suppressSizeToFit: true },
      { headerName: "Upload date", field: "uploadDate", width: 137, suppressSizeToFit: true, cellRenderer: this.formatDate },
      { headerName: "Download", field: "previewUrl", width: 275, suppressSizeToFit: true, cellRenderer: this.downloadLink }
    ]
    this.onGridReady = this.onGridReady.bind(this)
  }

  static contextType = GlobalContext;

  componentDidMount(){
    xhrGet('/document').then((res) => {
      this.context.setDocumentData(res.data.documents)
    })
  }
  
  componentWillReceiveProps(prev, next){
    if(this.api){
      const rowData = [],
            documentData = next.documentData,
            documentDataLength = documentData.length,
            updatedNode = documentData[documentDataLength-1]
      this.api.forEachNode(function(node) {
        rowData.push(node.data);
      });
      if(rowData.length === documentDataLength){
        let itemsToUpdate = [];
        const { isUploadedProgress, previewUrl } = updatedNode
        this.api.forEachNodeAfterFilterAndSort(function(rowNode, index) {
          if(index === documentDataLength-1){
            var data = rowNode.data
            data.isUploadedProgress = isUploadedProgress
            data.previewUrl = previewUrl
            itemsToUpdate.push(data)
          }
        }.bind(this))
        
        this.api.applyTransaction({ update: itemsToUpdate });
        this.api.resetRowHeights()
      }else if(!rowData.length){
        this.api.applyTransaction({ add: documentData })
      }else{
        this.api.applyTransaction({ add: [documentData[documentDataLength-1]] })
      }
    }
  }

  onGridReady(params){
    this.api = params.api;
  }

  createLink = (val) => {
    const {previewUrl, isUploadedProgress, name} = val.data
    return (
      isUploadedProgress === 100 ? 
      `<a href=${previewUrl}>${name}</a>` : `<span>${name}</span>`
    )
  }

  downloadLink = (val) => {
    const {previewUrl, isUploadedProgress} = val.data
    return (
      isUploadedProgress !== 100 ? 
        `<span class="outer">
          <span class="inner" style=width:${isUploadedProgress}%>&nbsp;</span>
          <span class="totalProgress">${isUploadedProgress}%</span>
        </span>` : 
        this.getPreviewUrls(previewUrl)
    )
  }

  getPreviewUrls(previewUrl){
    let urls = ''
    const {apiUrl} = properties
    previewUrl.length < 2 ? 
      urls = `<a target="_blank" href=${apiUrl}${previewUrl}>Download file</a>` :
      (previewUrl.forEach((curUrl, i) => {
        urls += `<a target="_blank" key=${i} href=${apiUrl}${curUrl}>Download file ${i}</a> <br />`
      }))
    return urls
  }

  formatDate(dateStr){
    const nowDate = new Date(Number(dateStr.data.uploadDate))
    const fixedPlace = (val) => {
      return val < 10 ? '0'+val : val
    }
    return `${fixedPlace(nowDate.getDate())}/${fixedPlace(nowDate.getMonth())}/${fixedPlace(nowDate.getFullYear())}`
  }

  setHeight(params){
    return params.data.previewUrl ? params.data.previewUrl.length * 40 : 40
  }

  render(){
    return(
      <div className="page-container">
        <div className="document-container">
          <div className="ag-theme-alpine blotter" style={ {height: '580px', width: '100%'} }>
            <AgGridReact
              onGridReady={this.onGridReady}
              rowData={[]}
              animateRows
              getRowHeight={this.setHeight}
              columnDefs={this.columnDefs}
              defaultColDef={{
                sortable: true,
                resizable: true
              }}>
            </AgGridReact>
          </div>
          <UploadForm />
        </div>
      </div>
    )
  }
}