const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        min: 4,
    },
    commentsLikes: {
        type: [String],
        default: [],
    }
}, {timestamps: true})

module.exports = mongoose.model("Comment", CommentSchema)