import { useState, useEffect } from 'react'
import JsonData from '../data.json'
import SmoothScroll from 'smooth-scroll'
import { All } from '../components/all.jsx'


export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
  })
  
  const AboutScreen = () => {
    const [landingPageData, setLandingPageData] = useState({})
    useEffect(() => {
      setLandingPageData(JsonData)
    }, [])
  
    return (
      <div>
        {/* <Navigation /> */}
        <All data={landingPageData} />
      </div>
    )
  }
  
  export default AboutScreen