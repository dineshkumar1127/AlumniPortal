const Mongoose  = require('mongoose')
const {ObjectId} = Mongoose.Schema.Types

const postSchema = new Mongoose.Schema({

    body:{
        type:String,
        required:true
    },

    link:{
        type:String,
        required:true
    },

    photo:{
        type:String,
        required:true
    },

    comments:[{
        text:String,
        postedBy:{type:ObjectId , ref:"User"}
    }],

    postedBy:{
        type:ObjectId,
        ref:"User"
    }

   

},{timestamps:true})


Mongoose.model("Post",postSchema)