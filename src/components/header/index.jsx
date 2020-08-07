import React from 'react'
import {Link} from 'react-router-dom';

import './header.scss'

const Header = (props) => {
  const createTabs = (tab, index) => {
    const { pageLink, displayName } = tab
    return(
      <li key={`${displayName}${index}`}><Link to={pageLink}>{displayName}</Link></li>
    )
  }

  return(
    <header className="header">
      <h1>MyFavoriteSite</h1>
      <ul>{props.pages.map(createTabs)}</ul>
    </header>
  )
}

export default Header