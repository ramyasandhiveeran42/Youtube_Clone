import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY, beforeDaysMonths, value_converter } from '../../data'


const PlayVideo = ({videoId}) => {

    const[apiData , setApiData] = useState(null)
    const [channelData , setChannelData] = useState(null)
    const [commentData , setCommentData] = useState([])

    const fetchVideoData = async () => {
        const videoDataUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        
        try {
            const response = await fetch(videoDataUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setApiData(data.items ? data.items[0] : null); // Assuming we want the first item

        } catch (error) {
            console.error('Error fetching video data:', error);
        }
    };

    const fetchotherData = async ()=>{

        /// Fetching Channel Data
        const otherVideoDetails = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        try {
            const response = await fetch(otherVideoDetails)
            if(!response){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setChannelData(data.items ? data.items[0] : null)
        } catch (error) {
            console.error('Error fetching video data:', error);
        }
        /// Fetching Comment Dat
        
        const commenturl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY}`
        // console.log(commenturl);
        
         try {
            const response = await fetch(commenturl);
            if(!response){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json()
            setCommentData(data.items)
         } catch (error) {
            
         }
    }
    
    useEffect(() => {
        fetchotherData()
     }, [apiData]);

      useEffect(()=>{
       fetchVideoData()
     },[videoId])

// console.log(commentData);


  return (
    <div className='play-video'>
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
        <h3>{apiData?apiData.snippet.title:""}</h3>
        <div className="play-video-info">
            <p>{value_converter(apiData?apiData.statistics.viewCount:"")} views &bull; {beforeDaysMonths(apiData?apiData.snippet.publishedAt:"")}</p>
            <div>
                <span><img src={like} alt="" />{value_converter(apiData?apiData.statistics.likeCount:"")}</span>
                <span><img src={dislike} alt="" /></span>
                <span><img src={share} alt="" />Share</span>
                <span><img src={save} alt="" />Save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:""}</p>
                <span>{channelData? value_converter(channelData.statistics.subscriberCount):"1M"}</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="video-description">
           <p>{apiData ? apiData.snippet.description.slice(0,250) : "Description Here"}</p>
            <hr />
            <h4>{`${value_converter(apiData?apiData.statistics.commentCount:"")} Comments`}</h4>

           {commentData.map((data,index)=>{
            return(
                <div key={index} className="comment">
                    <img src={data ? data.snippet.topLevelComment.snippet.authorProfileImageUrl: user_profile} alt="" />
                    <div >
                        <h3>{data?data.snippet.topLevelComment.snippet.authorDisplayName:""}<span>{beforeDaysMonths(data?data.snippet.topLevelComment.snippet.publishedAt:"")}</span></h3>
                        <p>{data?data.snippet.topLevelComment.snippet.textDisplay:""}</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>{value_converter(data?data.snippet.topLevelComment.snippet.likeCount:"")}</span>
                            <img src={dislike} alt="" />
                        </div>
                   </div>
                </div>
            )
           })}
       </div>
    </div>
  )
}

export default PlayVideo
