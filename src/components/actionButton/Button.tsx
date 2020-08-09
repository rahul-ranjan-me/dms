import React from 'react'

import './buttons.scss'

const Button = (props) => {
  const { buttonType, displayText, type, onClick, className } = props
  return(
    <button 
      className={`btn btn-${type} ${className}`} 
      type={buttonType} 
      onClick={onClick ? onClick : null}>
        {displayText}
    </button>
  )
}

export default Button