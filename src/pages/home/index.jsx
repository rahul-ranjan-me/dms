import React from 'react'
import Banner from '../../components/banner/index'
import Widget from '../../components/widgets/index'
import DocUploadProgress from '../../components/docUploadProgress/index'
import homeWidget from './homeWidget'

import './home.scss'

const Home = () => {
  return(
    <div className="page-container">
      <Banner 
        primaryMessage={`Making things better together`} 
        secondaryMessage={`So you can work faster, smarter - and be more productive`} 
      />

      <div className="home-widgets">
        {homeWidget.map(Widget)}
      </div>
      <div className="home-widgets">
        {homeWidget.map(Widget)}
      </div>
      <DocUploadProgress />
    </div>
  )
}

export default Home