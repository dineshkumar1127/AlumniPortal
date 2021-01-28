const express = require('express')
const router  = express.Router()
const Mongoose = require('mongoose')
const requirelogin = require('../middleware/requireLogin')
const User = Mongoose.model("User")
const Post = Mongoose.model("Post")
Mongoose.set('useFindAndModify', false)


router.get('/user/:id',requirelogin,(req,res)=>{
    
    User.findOne({_id : req.params.id}).select("-password").then(user=>{
        Post.find({postedBy : req.params.id}).
        populate("postedBy" , "_id name").exec((err,posts)=>{
            if(err){
                return res.status(422).json.apply({error:err})
            }

            res.json({user,posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not Found"})
    })
})



router.put('/updatePic',requirelogin,(req,res)=>{

    User.findByIdAndUpdate(req.user._id,{$set : {pic: req.body.pic}},{
        new : true
    },(err,result)=>{
        if(err){
           return res.status(422).json({error:"No Change!"})
        }
        res.json(result)
    })
})


router.put('/updateProfile',requirelogin,(req,res)=>{

    const {username,batch,company,linkedIn,twitter,about} = req.body

    if( !username || !batch || !company || !linkedIn || !twitter  || !about){
        return res.status(422).json({error:"Fill all required Field"})
    }


    User.findByIdAndUpdate(req.user._id,{$set: {username:username , batch:batch , company:company , linkedIn:linkedIn , twitter:twitter , about:about}},{
        new : true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:"No change!"})
        }
        res.json(result)
    })
})

router.post('/searchUsers',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({email: {$regex:userPattern}}).select("_id email pic username").then(user=>{
        res.json({user})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router