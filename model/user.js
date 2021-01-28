const Mongoose = require('mongoose')
const {ObjectId} = Mongoose.Schema.Types
const userSchema = new Mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    scholar:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    batch:{
        type:Number,
        required:true
    },

    pic:{
        type:String,
        required:"true",
        default:"https://png.pngitem.com/pimgs/s/20-203432_profile-icon-png-image-free-download-searchpng-ville.png"
    },

    twitter:{
        type:String,
        default:" "
    },

    linkedIn:{
        type:String,
        default:" "
    },

    company:{
        type:String,
        default:" "
    },

    about:{
        type:String,
        default:" "
    },

    resetToken:String,
    expireToken:Date


    

})


Mongoose.model("User",userSchema)