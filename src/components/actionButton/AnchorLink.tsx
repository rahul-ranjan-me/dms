import React from 'react'
import { Link } from 'react-router-dom';

import './buttons.scss'

const AnchorLink = (props: {to:string, displayText: string, type:string, onClick: any, className: string}) => {
  const {to, displayText, type, onClick, className} = props
  return(
    <Link 
      className={`btn btn-${type} ${className}`} 
      to={to} 
      onClick={onClick ? onClick : null}>
        {displayText}
    </Link>
  )
}

export default AnchorLink