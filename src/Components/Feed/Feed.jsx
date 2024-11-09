import React, { useEffect, useState } from 'react'
import './Feed.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import { API_KEY, beforeDaysMonths, value_converter } from '../../data'

const Feed = ({category}) => {

  const [data, setData] = useState([])

  const fetchData = async () => {
    const videolistUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    
    try {
      const response = await fetch(videolistUrl);
      const data = await response.json();
      await setData(data.items); 
    } catch (error) {
      console.error('Error fetching video list:', error);
    }
    // console.log(videolistUrl);
  };


useEffect(()=>{
   fetchData()
},[category])
// console.log(data);


  
  return (
    <div className="feed">
      {data.map((val,index)=>{
     return(
      <Link to={`/video/${val.snippet.categoryId}/${val.id}`} key={index} className='card'>
      <img src={val.snippet.thumbnails.medium.url} alt="" />
      <h2>{val.snippet.title}</h2>
      <h3>{val.snippet.channelTitle}</h3>
       <p>{value_converter(val.statistics.viewCount)} views &bull; {beforeDaysMonths(val.snippet.publishedAt)}</p>
   </Link>
     )
      })}
    </div>
  )
}

export default Feed
