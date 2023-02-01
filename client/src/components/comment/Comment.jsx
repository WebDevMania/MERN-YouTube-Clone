import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import classes from './comment.module.css'

import person from '../../assets/person.jpg'
import { format } from 'timeago.js'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const Comment = ({ c, comments, setComments }) => {
    const { token, user } = useSelector((state) => state.auth)
    const [comment, setComment] = useState(c)
    const [isLiked, setIsLiked] = useState(comment?.commentsLikes?.includes(user._id))


    const handleLikeComment = async (id) => {
        try {
            await fetch(`http://localhost:5000/comment/likeComment/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: 'PUT'
            })

            setComment(prev => {
                if(isLiked){
                    return {...prev, commentsLikes: prev.commentsLikes.filter((id) => id !== user._id)}
                } else {
                    return {...prev, commentsLikes: [...prev.commentsLikes, user._id]}
                }
            })
            setIsLiked(prev => !prev)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={classes.comment}>
            <div className={classes.leftSideComment}>
                <img src={person} className={classes.commentUserImg} />
                <div className={classes.profileUserMetaData}>
                    <div className={classes.topMetaData}>
                        <h5>somerandomname</h5>
                        <span>{format(c.createdAt)}</span>
                    </div>
                    <div className={classes.bottomMetaData}>
                        <p>{c.text}</p>
                    </div>
                </div>
            </div>
            <div className={classes.rightSideComment}>
                {isLiked ? <ThumbUpAltIcon onClick={() => handleLikeComment(c._id)} className={classes.likeIcon} /> : <ThumbUpOffAltIcon onClick={() => handleLikeComment(c._id)} className={classes.likeIcon} />}
                <p>{comment?.commentsLikes?.length || 0} likes</p>
            </div>
        </div>
    )
}

export default Comment