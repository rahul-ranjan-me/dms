const supportedTypes = [
  'application/msword',
  'application/pdf',
  'application/zip',
  'video/mp4',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0){
    return '0byte'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + sizes[i]
}

export default {
  bytesToSize,
  supportedTypes
}