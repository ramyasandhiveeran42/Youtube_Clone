import React, { useEffect, useState } from 'react'
import './Recommended.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { API_KEY, beforeDaysMonths, value_converter } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({categoryId}) => {
  const[apiData , setApiData] = useState([])

  const fetchData = async()=>{
    const relatedVideoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=10&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    
    try {
      const response = await fetch(relatedVideoUrl);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setApiData(data.items); // Assuming we want the first item

  } catch (error) {
      console.error('Error fetching video data:', error);
  }
  }

  useEffect(()=>{
    fetchData()
  },[categoryId])

  console.log(apiData);
  
  return (
    <div className='recommended'>
    {apiData.map((item,index)=>{
      return(
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
        <img src={item.snippet.thumbnails.medium.url} alt="" />
        <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p className='like'>{value_converter(item.statistics.viewCount)}</p>
        </div>
      </Link>
      )
    })}
       </div>
  )
}

export default Recommended
