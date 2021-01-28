const Mongoose = require('mongoose')
// const {ObjectId} = Mongoose.Schema.Types

const ChatSchema = new Mongoose.Schema({

    message:{
            type:"String",
            required:true
        },

    name:{
                type:"String",
                required:true
        },

    timeStamp:{
                type:"String",
                required:true
        },

    receiver:{
                type:Boolean
        },
    
    MsgEmail:{
        type:"String",
        required:true
    }
    
})

// export default Mongoose.model('Chat',ChatSchema)
Mongoose.model("chat",ChatSchema)