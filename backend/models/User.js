const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    photo: {
        type: String,
        default: ''
    },
    subscribers: {
        type: [String],
        default: [],
    },
    subscribedUsers: {
        type: [String],
        default: [],
    }
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)