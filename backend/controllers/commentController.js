const Comment = require('../models/Comment')
const Video = require('../models/Video')

const getCommentsFromVideo = async(req, res) => {
    try {
        const videoId = req.params.videoId
        const comments = await Comment.find({videoId}).sort({createdAt: '-1'})
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const createComment = async(req, res) => {
    try {
        const comment = await Comment.create({...req.body, userId: req.user.id, videoId: req.params.videoId})
        const video = await Video.findById(req.params.videoId)
        video.comments.push(comment._id)
        await video.save()
        return res.status(200).json(comment)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const deleteComment = async(req, res) => {
    try {
        const currentUserId = req.user.id
        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
            throw new Error("Comment does not exist")
        }

        if(comment.userId !== currentUserId){
            throw new Error("Can't delete comments that are not yours")
        } else {
            await Comment.findByIdAndDelete(req.params.commentId)
            return res.status(200).json({msg: 'Comment has been successfully deleted'})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const likeComment = async(req, res) => {
    try {
        const currentUserId = req.user.id
        const commentId = req.params.commentId

        const comment = await Comment.findById(commentId)
        if(comment.commentsLikes.includes(currentUserId)){
            comment.commentsLikes = comment.commentsLikes.filter((commentLike) => commentLike !== currentUserId)
            await comment.save()
            return res.status(200).json({msg:"Successfully unliked the comment"})
        } else {
            comment.commentsLikes.push(currentUserId)
            await comment.save()
            return res.status(200).json({msg:"Successfully liked the comment"})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    getCommentsFromVideo,
    createComment,
    deleteComment,
    likeComment
}