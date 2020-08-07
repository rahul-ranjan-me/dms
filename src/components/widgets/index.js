import React from 'react'
import {AnchorLink} from '../actionButton/index'

import './widget.scss'

const Widget = (props, index) => {
  const {imageUrl, heading, content, button} = props
  const {to, displayText, className} = button

  return(
    <div className="widget-container" key={`${heading}${index}`}>
      <img src={imageUrl} alt={heading} />
      <h2>{heading}</h2>
      <p>{content}</p>
      <AnchorLink to={to} displayText={displayText} className={className} type="secondary" />
    </div>
  )
}

export default Widget