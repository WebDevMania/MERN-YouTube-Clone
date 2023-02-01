const User = require('../models/User')
const bcrypt = require('bcrypt')

const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) throw new Error("No such user")
        const {password, ...others} = user._doc
        return res.status(200).json({user: others})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const updateUser = async(req, res) => {
    if(req.params.id === req.user.id){
       try {
         if(req.body.password){
            const newPassword = await bcrypt.hash(req.body.password, 10)
            req.body.password = newPassword
         }
         const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})

         return res.status(200).json(updatedUser)
       } catch (error) {
        return res.status(500).json(error.message)
       }
    } else {
        return res.status(403).json({msg: 'You can update only your profile'})
    }
}

const deleteUser = async(req, res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(500).json({msg: 'No such user'})
    }

    console.log(user._id)

    if(req.user.id === user._id.toString()){
      console.log('something')
      try {
        await User.findByIdAndDelete(req.params.id)

        return res.status(200).json({msg: 'Successfully deleted'})
      } catch (error) {
        return res.status(500).json(error.message)
      }
    } else {
        return res.status(403).json({msg: 'You can delete only your profile'})
    }
}

const subscribeUser = async(req, res) => {
   if(req.params.id !== req.user.id){
    try {
      const otherUserId = req.params.otherUserId  
      const currentUserId = req.user.id
      const otherUser = await User.findById(otherUserId)
      const currentUser = await User.findById(currentUserId)

      if(otherUser.subscribers.includes(currentUserId)){
        otherUser.subscribers = otherUser.subscribers.filter((subcriber) => subcriber !== currentUserId)
        currentUser.subscribedUsers =  currentUser.subscribedUsers.filter((subcriber) => subcriber !== otherUserId)
        await otherUser.save()
        await currentUser.save()

        return res.status(200).json({msg: 'Successfully unsubscribed'})
      } else {
        otherUser.subscribers.push(currentUserId)
        currentUser.subscribedUsers.push(otherUserId)

        await otherUser.save()
        await currentUser.save()

        return res.status(200).json({msg: 'Successfully subscribed'})
      }
    } catch (error) {
        return res.status(500).json(error.message) 
    }
   } else {
      return res.status(403).json({msg: "You can't subscribe to yourself"})
   }
}

module.exports = {
    getUser,
    updateUser,
    deleteUser,
    subscribeUser
}