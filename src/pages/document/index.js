import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import FileViewer from 'react-file-viewer';
import GlobalContext from '../../components/globalState/globalContext'
import { xhrGet } from '../../xhr'
import UploadForm from '../../components/uploadForm/uploadForm'
import properties from '../../properties'
import './document.scss'

export default class Document extends Component{
  constructor(props){
    super(props)
    this.columnDefs = [
      { headerName: "Name", field: "name", width: 137, suppressSizeToFit: true },
      { headerName: "Description", field: "description", width: 137, suppressSizeToFit: true },
      { headerName: "Upload date", field: "uploadDate", width: 137, suppressSizeToFit: true, cellRenderer: this.formatDate },
      { headerName: "Download", field: "previewUrl", width: 250, suppressSizeToFit: true, cellRenderer: this.downloadLink },
    ]
    this.onGridReady = this.onGridReady.bind(this)
    this.showPreview = this.showPreview.bind(this)
    this.state = {
      type: null,
      file: null
    }
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

  showPreview(apiUrl, link){
    this.setState({
      file: `${apiUrl}${link}`,
      type: link.split('.').pop()
    })
  }

  hidePreview(){
    this.setState({
      file: null,
      type: null
    })
  }

  downloadLink = (val) => {
    const {previewUrl, isUploadedProgress} = val.data
    return (
      isUploadedProgress !== 100 ? 
        `<span class="outer">
          <span class="inner" style=width:${isUploadedProgress}%>&nbsp;</span>
          <span class="totalProgress">${isUploadedProgress}%</span>
        </span>` : 
        this.getPreviewUrls(previewUrl, val)
    )
  }

  createAnchorNodes(apiUrl, link, index){
    const div = document.createElement('div')
    const downloadSpan = document.createElement('span')
    downloadSpan.setAttribute('class', 'prev-down')
    const download = document.createElement('a')
    download.setAttribute('target', '_blank')
    download.setAttribute('href', `${apiUrl}${link}`)
    download.innerHTML = `Download file ${index ? index : ''} | `
    downloadSpan.appendChild(download)
    
    const preview = document.createElement('a')
    preview.addEventListener('click', () => this.showPreview(apiUrl, link))
    preview.innerHTML = `Preview file ${index ? index : ''}`
    downloadSpan.appendChild(preview)
    
    return div.appendChild(downloadSpan)
  }

  getPreviewUrls(previewUrl, val){
    const { apiUrl } = properties
    const div = document.createElement('div')
    if(previewUrl.length < 2){
      div.appendChild(this.createAnchorNodes(apiUrl, previewUrl[0]))
    }else{
      previewUrl.forEach((curUrl, i) => {
        div.appendChild(this.createAnchorNodes(apiUrl, curUrl, i))
      })
    }
    return div
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

  onError(err){
    console.log(err)
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
              components = {{
                'createLink': this.createLink
              }}
              defaultColDef={{
                sortable: true,
                resizable: true
              }}>
            </AgGridReact>
          </div>

          <UploadForm />
          {this.state.file ? 
            <div className="previewer">
              <div className="background" onClick={this.hidePreview.bind(this)}></div>
              <div className="preview-container">
                <FileViewer
                  key={Math.random().toString()}
                  fileType={this.state.type}
                  filePath={this.state.file}
                  onError={this.onError}/>
                </div>
            </div> 
            : undefined 
          }
        </div>
      </div>
    )
  }
}