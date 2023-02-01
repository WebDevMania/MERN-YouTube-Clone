const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/authRouter')
const commentRouter = require('./routes/commentRouter')
const userRouter = require('./routes/userRouter')
const videoRouter = require('./routes/videoRouter')
const dotenv = require("dotenv").config()
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/video', videoRouter)
app.use('/comment', commentRouter)

// db connect
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, () => console.log('Db is successfully connected'))

// connect app
app.listen(process.env.PORT, () => console.log('Server has been started successfully '))