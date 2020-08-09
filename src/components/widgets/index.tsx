import React from 'react'
import { AnchorLink } from '../actionButton/index'

import './widget.scss'

const Widget = (props, index) => {
  const { imageUrl, heading, content, button } = props
      , { to, displayText, className } = button

  return(
    <div className="widget-container" key={`${heading}${index}`}>
      <img src={imageUrl} alt={heading} />
      <h2>{heading}</h2>
      <p>{content}</p>
      <AnchorLink to={to} displayText={displayText} onClick="" className={className} type="secondary" />
    </div>
  )
}

export default Widget