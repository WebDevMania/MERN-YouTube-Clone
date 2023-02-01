const userRouter = require('express').Router()
const { getUser, updateUser, deleteUser, subscribeUser } = require('../controllers/userController')
const verifyToken = require('../middleware/verifyToken')

userRouter.get('/find/:id', verifyToken, getUser)
userRouter.put('/updateUser/:id', verifyToken, updateUser)
userRouter.delete('/deleteUser/:id', verifyToken, deleteUser)
userRouter.put('/subscribe/:otherUserId', verifyToken, subscribeUser)

module.exports = userRouter