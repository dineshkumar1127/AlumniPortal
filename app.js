const express = require('express')()
const app  = express
const PORT = process.env.PORT || 4500
const  Mongoose = require('mongoose')
const { MONGOURI } = require('./config/key')
const bodyParser = require('body-parser')
const Cors = require('cors')




Mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

Mongoose.connection.on('connected',()=>{
    console.log("Connected to MongoDB")
    
})

Mongoose.connection.on('error',(err)=>{
    console.log("Error using MongoDB",err)
})


require('./model/user')
require('./model/post')
require('./model/message')


app.use(bodyParser.json())
app.use(require('./Router/auth'))
app.use(require('./Router/post'))
app.use(require('./Router/user'))
app.set(require('./Router/chat'))
app.use(Cors())


if(process.env.NODE_ENV == "production"){
    app.use(express.static('client0/build'))

    const path = require('path')

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client0','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})