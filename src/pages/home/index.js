import React from 'react'
import Banner from '../../components/banner/index'
import Widget from '../../components/widgets/index'
import DocUploadProgress from '../../components/docUploadProgress/index'

import './home.scss'

const Home = () => {
  const homeWidget = [
    {
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-aAngr9AVNQVxnSSc17sjrx1hnQioaYSG3Q&usqp=CAU',
      heading: 'Blotter App',
      content: 'A single blotter to run transaction',
      button: {
        to: '/dummy',
        displayText: 'Learn more',
        className:'home-widget-anchor'
      }
    },
    {
      imageUrl: 'https://cdn1.iconfinder.com/data/icons/shopping-blue-set-1-1/100/shopping-11-512.png',
      heading: 'Trade exchange',
      content: 'Start your trade here',
      button: {
        to: '/dummy',
        displayText: 'Learn more',
        className:'home-widget-anchor'
      }
    },
    {
      imageUrl: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/online-payment-36-553241.png',
      heading: 'Currency exchange',
      content: 'One second money exchange',
      button: {
        to: '/dummy',
        displayText: 'Learn more',
        className:'home-widget-anchor'
      }
    }
  ]
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