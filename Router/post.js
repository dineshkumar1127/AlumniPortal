const express = require('express')
const router = express.Router()
const Mongoose = require('mongoose')
const requirelogin = require('../middleware/requireLogin')
const Post = Mongoose.model("Post")

router.post('/create',requirelogin,(req,res)=>{

    const {body,link,photo} = req.body

     req.user.password = undefined

    if(!body || !link || !photo){
        return res.status(422).json({error:"Please add all Field"})
        
    }
    
    const post = new Post({
        body,
        link,
        photo,
        postedBy:req.user
    })

    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.get('/allposts',requirelogin,(req,res)=>{
    Post.find().populate("postedBy","_id username pic").sort('-createdAt').then((posts)=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.get('/myposts',requirelogin,(req,res)=>{
    Post.find({postedBy:req.user._id}).populate("postedBy","_id username").then(myposts=>{
        res.json({myposts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.delete('/removeposts/:postId',requirelogin,(req,res)=>{

    Post.findOne({_id: req.params.postId}).populate("postedBy","_id").exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove().then(result=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})



module.exports = router