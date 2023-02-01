const { createComment, getCommentsFromVideo, deleteComment, likeComment } = require('../controllers/commentController')
const verifyToken = require('../middleware/verifyToken')

const commentRouter = require('express').Router()

commentRouter.get('/:videoId', verifyToken, getCommentsFromVideo)
commentRouter.post('/:videoId', verifyToken, createComment)
commentRouter.put('/likeComment/:commentId', verifyToken, likeComment)
commentRouter.delete('/:commentId', verifyToken, deleteComment)

module.exports = commentRouter