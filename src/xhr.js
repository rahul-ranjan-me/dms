import properties from './properties'

import axios from 'axios'

const xhrGet = (url, config) => {
  return axios.get(`${properties.apiUrl}${url.replace(/^\/+/, '')}`, config)
}

const xhrPost = (url, data, config) => {
  return axios.post(`${properties.apiUrl}${url.replace(/^\/+/, '')}`, data, config)
}

const xhrPut = (url, data, config) => {
  return axios.put(`${properties.apiUrl}${url.replace(/^\/+/, '')}`, data, config)
}

export { xhrGet, xhrPost, xhrPut }