import React, { useEffect, useState } from 'react'
import channelImg from '../../assets/person.jpg'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import classes from './card.module.css'
import { format } from 'timeago.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Card = ({ video }) => {
  const [channelDetails, setChannelDetails] = useState("")
  const {token} = useSelector((state) => state.auth)
  
  useEffect(() => {
    const fetchChannelDetails = async () => {
        try {
          const res = await fetch(`http://localhost:5000/user/find/${video?.userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
          })
          const {user} = await res.json()
          setChannelDetails(user)
        } catch (error) {
            console.error(error)
        }
    }
   video && fetchChannelDetails()
  }, [video.userId])

  
  return (
   <div className={classes.videoCard}>
    <Link to={`/videoDetail/${video?._id}`}>
      <img src={video?.thumbnailImg} className={classes.thumbnail} alt="" />
    </Link>
      <div className={classes.detailVideo}>
          <img src={channelImg} className={classes.channelImg} alt="" />
          <div className={classes.rightSideDetail}>
              <div className={classes.channelName}>
                 <h4>{video.title}</h4>
                 <CheckCircleIcon className={classes.checkIcon} />
             </div>
             <div className={classes.viewsAndTime}>
                  <span className={classes.views}>{video.views || 0} views</span>
                  <FiberManualRecordIcon className={classes.dotIcon} />
                 <span className={classes.time}>{format(video.createdAt)}</span>
             </div>
         </div>
     </div>
   </div>
  )
}

export default Card