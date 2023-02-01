const { getVideo, getVideoByCategories, createVideo, deleteVideo, likeDislikeVideo, getVideos } = require('../controllers/videoController')
const verifyToken = require('../middleware/verifyToken')

const videoRouter = require('express').Router()

videoRouter.post('/', verifyToken, createVideo)
videoRouter.get('/findAll', verifyToken, getVideos)
videoRouter.get("/find/:id", verifyToken, getVideo)
videoRouter.get('/categories', verifyToken, getVideoByCategories)
videoRouter.delete('/deleteVideo/:id', verifyToken, deleteVideo)
videoRouter.put('/likeDislikeVideo/:id', verifyToken, likeDislikeVideo)

module.exports = videoRouter

