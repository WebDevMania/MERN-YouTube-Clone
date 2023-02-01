const Video = require('../models/Video')

const getVideos = async(req, res) => {
    try {
        const videos = await Video.find({})
        
        return res.status(200).json(videos)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const getVideo = async(req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) throw new Error("No such video")
        video.views += 1
        await video.save()

        
        return res.status(200).json(video)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const getVideoByCategories = async(req, res) => {
    let categories = req.query.cats.split(',')

    try {
        const videos = await Video.find({categories: {$in: categories}})
        if(videos.length === 0){
            throw new Error("No video with those categories")
        }

        return res.status(200).json(videos)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const createVideo = async(req, res) => {
   try {
    const video = await Video.create({...req.body, userId: req.user.id})
    console.log(video)
    
    return res.status(201).json(video)
   } catch (error) {
    return res.status(500).json(error.message)
   }
}

const deleteVideo = async(req, res) => {
    try {
        const video = await Video.findById(req.params.id)
        if(video.userId !== req.user.id){
            throw new Error("Can't delete video that is not yours")
        } else {
            await Video.findByIdAndDelete(req.params.id)
            return res.status(200).json({msg: 'Successfully deleted video'})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const likeDislikeVideo = async(req, res) => {
    try {
        const currentUserId = req.user.id
        const video = await Video.findById(req.params.id)

        if(video.likes.includes(currentUserId)){
            video.likes = video.likes.filter((like) => like !== currentUserId)
            await video.save()
            return res.status(200).json({msg: 'Successfully unliked video'})
        } else {
            video.likes.push(currentUserId)
            await video.save()
            return res.status(200).json({msg: 'Successfully liked video'})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    getVideo,
    getVideoByCategories,
    createVideo,
    deleteVideo,
    likeDislikeVideo,
    getVideos
}