const { register, login, googleAuth } = require('../controllers/authController')

const authRouter = require('express').Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/authGoogle', googleAuth)

module.exports = authRouter