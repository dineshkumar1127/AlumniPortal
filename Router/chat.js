const express = require('express')
const router = express.Router()
const  Mongoose  = require('mongoose')
const Chat = Mongoose.model('chat')
const requirelogin = require('../middleware/requirelogin')
const Pusher = require('pusher')
const io = require('../app').io


// const pusher = new Pusher({
//     appId: "1130137",
//     key: "df03e9a4ad2684a4e1fe",
//     secret: "0494f0ce8a1d5d3a0190",
//     cluster: "eu",
//     useTLS: true
//   });

// const db = Mongoose.connection

// db.once("open",()=>{
//     console.log("DB connected")

//     const msgCollection = db.collection("chats")
//     const changeStream = msgCollection.watch()

//     changeStream.on("change" , (change)=>{ 
//         console.log(change)

//         if(change.operationType === "insert"){
//             const messageDetails = change.fullDocument

//             pusher.trigger("messages","inserted",{
                
//                 message:messageDetails.message,
//                 name:messageDetails.name,
//                 timeStamp:messageDetails.timeStamp,
//                 receiver:messageDetails.receiver,
//                 MsgEmail:messageDetails.MsgEmail 

//             })

//         }
//         else {
//             console.log("error triggering pusher")
//         }
//     })
// })


// io.on('connection', socket => {
  ////////////////////////////////////////
    //get the last 10 message from the DataBase
    // Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
    //     if (err) return console.error(err);


    //     //add new message to database
    //     socket.emit('init', messages);
    // });

    // socket.on('message', (msg) => {
    //     // Create a message with the content and the name of the user.
    //     const message = new Message({
    //       content: msg.content,
    //       name: msg.name,
///////////////////////////////////////////////////
    // const id = socket.handshake.query.id
    // socket.join(id)

    // socket.on('send-message', ({ recipients, text }) => {
    //     recipients.forEach(recipient => {
    //       const newRecipients = recipients.filter(r => r !== recipient)
    //       newRecipients.push(id)
    //       socket.broadcast.to(recipient).emit('receive-message', {
    //         recipients: newRecipients, sender: id, text
    //       })
    //     })
    //   })
    //     });
    
//         // Save the message to the database.
//         message.save((err) => {
//           if (err) return console.error(err);
//         });

//           // Notify all other users about a new message.
//     socket.broadcast.emit('push', msg);
// });
// });






// router.post('/message/new',requirelogin,(req,res)=>{

//     //BOTH ARE CORRECT ITS JUST A DUAL WAY OF WRITING THE SAME CODE

//     // const {message,name,timeStamp,receiver,MsgEmail} = req.body

//     // if(!message || !name || !timeStamp || !receiver || !MsgEmail){
//     //     return res.status(500).json({error:"Invalid request"})
//     // }
     
//     // const chat = new Chat({
//     //     message,
//     //     name,
//     //     timeStamp,
//     //     receiver,
//     //     MsgEmail
//     // })

//     // chat.save().then(result=>{
//     //     res.json({result})
//     // })

//     // .catch(err=>{
//     //     console.log(err)
//     // })

//     const message = req.body

//      Chat.create(message ,(err,data)=>{
//         if(err){
//             res.status(500).send(err)
//         }
//         else{
//             res.status(201).send(data)
//         }
//     })

//  })


// router.get('/message/sync',requirelogin,(req,res)=>{
//     Chat.find((err,data)=>{
//         if(err){
//             res.status(500).send(err)
//         }
//         else{
//             res.status(200).send(data)
//         }
//     })
// })

// const connectedUsers = { }

// const socket=()=>{
//   console.log("user has Connected")


//   socket.on(chat, (message,name,timeStamp,receiver,MsgEmail)=>{
// 		MsgEmail.socketId = socket.id
// 		connectedUsers = addUser(connectedUsers, MsgEmail)
// 		socket.name = name

// 		sendMessageToChatFromUser = sendMessageToChat(user.name)
// 		sendTypingFromUser = sendTypingToChat(user.name)

// 		io.emit(USER_CONNECTED, connectedUsers)
// 		console.log(connectedUsers);

// 	})
// }







module.exports = router