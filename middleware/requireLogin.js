const jwt = require('jsonwebtoken')
const {JWT_SECRET } = require('../config/key')
const Mongoose = require('mongoose')
const User = Mongoose.model('User')


module.exports = (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error:"You must LogIn First"})
    }

    const token = authorization.replace("jozem ","")

    jwt.verify(token,JWT_SECRET,(err,payload)=>{

        if(err){
            return res.status(401).json({error:"You must LogIn First"})
        }

        const {_id} = payload

        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
    })
}
