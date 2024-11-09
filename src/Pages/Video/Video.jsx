import React from 'react'
import './Video.css'
import { useParams } from 'react-router-dom'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recommended from '../../Components/Recommended/Recommended'

const Video = () => {
  const{categoryId,videoId} = useParams()
  return (
    <div className='play-container'> 
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId}/>
    </div>
  )
}

export default Video
