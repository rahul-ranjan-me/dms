const properties = {
  apiUrl: `${process.env.REACT_APP_API_BASE_PATH || '/'}`,
  uploadSizeLimitInMB: '250 MB', 
  uploadSizeLimitInGB: '5 GB',
  uploadSizeLimitPerFile: 2500 * 1000 * 1000,
  uploadSizeLimitTotal: 5 * 1000 * 1000 * 1000,
  supportedTypes : [
    'application/msword',
    'application/pdf',
    'application/zip',
    'video/mp4',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  progressNotificationTimeout: 15000
}

export default properties