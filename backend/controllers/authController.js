const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async(req, res) => {
    try {
        const isExisting = await User.findOne({email: req.body.email})
        if(isExisting){
            throw new Error("Email is taken, try another one")
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = await User.create({...req.body, password: hashedPassword})
        await user.save()

        const {password, ...others} = user._doc
        console.log(password)

        const token = generateToken({id: user._id.toString()})

        console.log(token)

        return res.status(201).json({token, user: others})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const login = async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            throw new Error("Invalid credentials")
        }

        const comparePass = await bcrypt.hash(req.body.password, user.password)

        if(!comparePass){
            throw new Error("Invalid credentials")
        }

        const {password, ...others} = user._doc

        const token = generateToken({id: user._id.toString()})

        return res.status(200).json({token, user: others})

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const googleAuth = async(req, res) => {
    const { email } = req.body

    try {
      const user = await User.findOne({ email })
      if(user){
        const {password, ...others} = user._doc

        const token = generateToken({id: user._id.toString()})
        return res.status(200).json({token, user: others})
      } else {
        return res.status(500).json({msg: 'First sign up with this email, then try to login.'})
      }

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '3h'})

    return token
}

module.exports = {
    register,
    login,
    googleAuth
}