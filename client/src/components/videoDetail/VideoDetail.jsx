import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'timeago.js'
import person from '../../assets/person.jpg'

import classes from './videoDetail.module.css'
import ShareIcon from '@mui/icons-material/Share';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DeleteIcon from '@mui/icons-material/Delete';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

import Card from '../card/Card'
import Comment from '../comment/Comment'


const VideoDetail = () => {
  const [videoDetails, setVideoDetails] = useState('')
  const [relatedVideos, setRelatedVideos] = useState([])
  const [channelDetails, setChannelDetails] = useState("")
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const { user, token } = useSelector((state) => state.auth)
  const { id } = useParams()
  const navigate = useNavigate()

  // fetch video
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/video/find/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await res.json()
        setVideoDetails(data)
        setIsLiked(data.likes.includes(user._id))
      } catch (error) {
        console.error(error)
      }
    }
    fetchVideoDetails()
  }, [id])

  // fetch related videos
  useEffect(() => {
    const fetchRelatedVideos = async () => {
      try {
        const res = await fetch(`http://localhost:5000/video/categories?cats=${videoDetails?.categories.join(",")}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await res.json()
        const filteredData = data.filter((video) => video._id !== videoDetails._id)
        setRelatedVideos(filteredData)
      } catch (error) {
        console.error(error)
      }
    }
    videoDetails && fetchRelatedVideos()
  }, [videoDetails])

  // fetch channel details
  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/user/find/${videoDetails?.userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const { user: userDetails } = await res.json()
        setChannelDetails(userDetails)
        
        const isSub = userDetails?.subscribers?.some((userId) => userId === user._id)
        setIsSubscribed(isSub)
      } catch (error) {
        console.error(error)
      }
    }
    videoDetails && fetchChannelDetails()
  }, [videoDetails, id])

  // fetch comments
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await fetch(`http://localhost:5000/comment/${videoDetails?._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await res.json()
        setComments(data)
      } catch (error) {
        console.error(error)
      }
    }
    videoDetails && fetchComment()
  }, [videoDetails, id])

  const likeVideoHandler = async() => {
    try {
      await fetch(`http://localhost:5000/video/likeDislikeVideo/${videoDetails?._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: 'PUT'
      })

      setVideoDetails((prev) => {
        return {...prev, likes: isLiked ? [...prev.likes].filter((id) => id !== user._id) : [...prev.likes, user._id]}
      })
      setIsLiked(prev => !prev)
    } catch (error) {
      console.error(error)
    }
  } 

  const handlePostComment = async () => {
    if (commentText === '') return

    try {
     const res = await fetch(`http://localhost:5000/comment/${videoDetails?._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({ text: commentText })
      })
     const data = await res.json()

     setComments(prev => [data, ...prev])
     setCommentText("")
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubscribe = async () => {
    try {
      await fetch(`http://localhost:5000/user/subscribe/${channelDetails._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: 'PUT'
      })

      setChannelDetails((prev) => {
        return {
         ...prev,
         subscribers:
         isSubscribed 
         ? [...prev.subscribers].filter((sub) => sub !== user._id)
         : [...prev.subscribers, user._id]}
      })

      setIsSubscribed(prev => !prev)
    } catch (error) {
      console.error(error)
    }
  }

  const toggleDeleteModal = () => {
    setModalOpen(prev => !prev)
  }

  const deleteVideo = async () => {
    try {
      await fetch(`http://localhost:5000/video/deleteVideo/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: 'DELETE'
      })
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.leftSide}>
          <video src={videoDetails?.videoUrl} controls />
          <div className={classes.videoData}>
            <div className={classes.leftSideVideoData}>
              <h1>{videoDetails?.title}</h1>
              <span>{videoDetails?.views} views  <FiberManualRecordIcon className={classes.dotIcon} /> {format(videoDetails?.createdAt)}</span>
            </div>
            <div className={classes.rightSideVideoData}>
              {
                isLiked 
                ? <span onClick={likeVideoHandler}><ThumbUpAltIcon /> {videoDetails?.likes?.length}</span>
                : <span onClick={likeVideoHandler}><ThumbUpOffAltIcon /> {videoDetails?.likes?.length}</span>
              }
              <span><ShareIcon /> Share</span>
              <span><BookmarkAddedIcon /> Save</span>
              {videoDetails?.userId === user._id && <span onClick={toggleDeleteModal}><DeleteIcon /> Delete</span>}
              {modalOpen && 
                   <div className={classes.deleteModal}>
                    <h4>Delete Modal?</h4>
                    <div className={classes.controls}>
                      <button onClick={deleteVideo} className={classes.deleteBtn}>Yes</button>
                      <button onClick={() => setModalOpen(false)} className={classes.deleteBtn}>No</button>
                    </div>
                   </div>
                }
            </div>
          </div>
          <hr />
          {/* channel details */}
          <div className={classes.channelDetails}>
            <div className={classes.channelDetailsLeft}>
              <img src={person} />
              <div>
                <span className={classes.username}>{channelDetails?.username}</span>
                <span className={classes.subscribers}>{channelDetails?.subscribers?.length} subscribers</span>
                <span className={classes.desc}>{videoDetails?.desc}</span>
              </div>
            </div>
            {videoDetails?.userId !== user._id && <button className={classes.subscribeBtn} onClick={handleSubscribe}>{isSubscribed ? 'Subscribed' : 'Subscribe'}</button>}
          </div>
          <hr />
          {/* comment input */}
          <div className={classes.commentInput}>
            <img src={person} />
            <input value={commentText} onChange={(e) => setCommentText(e.target.value)} type="text" placeholder='Add a comment...' />
            {commentText.length > 0 && <button onClick={handlePostComment} className={classes.postBtn}>Post comment</button>}
          </div>
          {/* comments */}
          <div className={classes.commentSection}>
            {comments?.length > 0 ? comments?.map((comment) => (
               <Comment key={comment._id} comments={comments} setComments={setComments} c={comment}/>
            )) : <h4>No comments in this video. Be the first one!</h4>}
          </div>
        </div>
        <div className={classes.rightSide}>
          <h2 className={classes.rightSideTitle}>Related videos</h2>
          {relatedVideos?.map((video) => (
            <Card key={video._id} video={video} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoDetail