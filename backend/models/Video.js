const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    thumbnailImg: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 4,
    },
    desc: {
        type: String,
        required: true,
        min: 8,
    },
    categories: {
        type: [String],
        default: [],
    },
    views: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
}, {timestamps: true})

module.exports = mongoose.model("Video", VideoSchema)