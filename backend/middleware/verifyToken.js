const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization
    if(!token || !token.startsWith("Bearer ")) return res.status(401).json({msg: "No token"})

    token = req.headers.authorization.split(' ')[1] 
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if(err) return res.status(401).json({msg: "Wrong or expired token"})
        else {
            req.user = data // data = {id: dsahugydsadsa}
            next()
        }
    })
}

module.exports = verifyToken