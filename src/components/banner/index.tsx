import React from 'react'

import './banner.scss'

const Banner = (props) => {
  const { primaryMessage, secondaryMessage } = props
  
  return (
    <div className="common-banner">
      <h1>{primaryMessage}</h1>
      <p>{secondaryMessage}</p>
    </div>
  )
}

export default Banner