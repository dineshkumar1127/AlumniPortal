const express = require('express')
const router = express.Router()
const Mongoose = require('mongoose')
const User = Mongoose.model("User")
const  bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET } = require('../config/key')
const nodemailer = require('nodemailer')
const sendgridTransport  = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')
const { SENDGRID_API , EMAIL} = require('../config/key')


const transport = nodemailer.createTransport(
    sendgridTransport({
        auth:{
            api_key:SENDGRID_API
        }
    })
)

router.post('/signup',(req,res)=>{
    const {username,batch,scholar,email,password} = req.body

    if(!username || !scholar  || !email || !password ||!batch ){
        return res.status(422).json({error:"Fill required Field"})
    }

    User.findOne({scholar:scholar}).then(savedUser=>{
        if(savedUser){
            return res.status(422).json({error:"Use your Scholar Number"})
        }
    

    User.findOne({email:email})
    .then(savedUser=>{

        if(savedUser){
            return res.status(422).json({error:"User already Exists"})
        }

        bcrypt.hash(password,12)
        .then(hashedPassword=>{
            
            const user = new User({
                username,
                scholar,
                email,
                password:hashedPassword,
                batch
            })
            user.save()
            .then(user=>{
                transport.sendMail({
                    to:user.email,
                    from:"dk9026563429@gmail.com",
                    subject:"Welcome to our ever growing family",
                    html:"<h1>Welcome to our Stay Connected Community<h1>"
                })
                res.json({message:"Successfully Registered"})
            })
            .catch(err=>{
                console.log(err)
            })
        }) 
        .catch(err=>{
            console.log(err) 
        })

          
    })
})
   
})


router.post('/signin',(req,res)=>{

    const {email,password} =req.body

    if(!email || !password){
        return res.status(422).json({error:"Fill required Field"})
    }

    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid User"}) 
        }

            bcrypt.compare(password,savedUser.password)
            .then(domatch=>{

                if(!domatch){
                    return res.status(422).json({error:"Invalid User"})
                }

                const tok = jwt.sign({_id: savedUser._id},JWT_SECRET)
                const {_id,username,email,batch,scholar,pic,company,linkedIn,twitter,message,name,timestamp,receiver,MsgEmail,about} = savedUser
                res.json({token:tok , user:{_id,username,email,batch,scholar,pic,company,linkedIn,twitter,message,name,timestamp,receiver,MsgEmail,about}})
            })
            .catch(err=>{
                console.log(err)
            })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/resetpassword',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{

        if(err){
            console.log(err)
        }
        const token =  buffer.toString("hex")

        User.findOne({email:req.body.email}).then(user=>{
            if(!user){
                return res.status(422).json({error:"Invalid email"})
            }
            user.resetToken = token
            user.expireToken = Date.now()+3600000

            user.save().then(result=>{
                transport.sendMail({
                    to:user.email,
                    from:"dk9026563429@gmail.com",
                    subject:"Password Reset",
                    html:`
                    <h1>Stay Connected Community </h1>
                    <h2>Password Reset</h2>
                    <p> you requested for password Reset !...</p>
                    <h3>Click in this <a href="${EMAIL}/reset/${token}">Link</a> to reset your password</h3>`
                })
                res.json({message:"Check Your email"})
            })
        })
    })
})

router.post('/newpassword',(req,res)=>{
    const newpassword = req.body.password
    const sentToken = req.body.token

    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:" Try again Session Expire "})
        }

        bcrypt.hash(newpassword,12).then(hashedpassword=>{
            user.password = hashedpassword
            user.resetToken = undefined
            user.expireToken = undefined
            user.save().then((saveduser)=>{
                res.json({message:"Password Updated Successfully"})
            })
        })
    
    }).catch(err=>{
        console.log(err)
    })

})

module.exports = router