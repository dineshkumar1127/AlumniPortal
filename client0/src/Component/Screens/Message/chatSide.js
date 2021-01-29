
import React,{useState , useContext , useEffect} from 'react'
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
import Chat from './Chat'
import { selectChatId, selectChatName, selectChatPic } from '../../chatSlicee'
import { useSelector } from 'react-redux'
import db from './Firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'






function ChatSide() {
    const {state , dispatch } = useContext(UserContext)    
    const [input , setInput] = useState("")
    const chatName = useSelector(selectChatName)
    const chatId = useSelector(selectChatId)
    const chatPic = useSelector(selectChatPic)
    const [messages , setMessages] = useState([])
    // const [image , setImage] = useState("")
    // const [textImage , setTextImage] = useState("")



    
    // useEffect(()=>{

    

    //     if(image){
    //         const data = new FormData()
    //         data.append("file",image)
    //         data.append("upload_preset","alumni")
    //         data.append("cloud_name","dcirgll8n")

    //         fetch('https://api.cloudinary.com/v1_1/dcirgll8n/image/upload',{
    //             method:"post",
    //             body:data
    //         })
    //         .then(res=>res.json()).then(data=>{
                
    //             fetch('/updatePic',{
    //                 method:"put",
    //                 headers:{
    //                     "Content-Type":"application/json",
    //                     "Authorization":"jozem "+localStorage.getItem("jwt")
    //                 },
    //                 body:JSON.stringify({
    //                     pic:data.url
    //                 })
    //             }).then(res=>res.json()).then(result=>{
    //              console.log(result)
    //              setTextImage(result)
    //             })
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //         }) 
    //     }

    // },[image])


    // const UpdatePic = (file) =>{
    //     setImage(file)

    // }





    useEffect(() => {
        if(chatId){
            db.collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot=>
                setMessages(snapshot.docs.map(doc=>({
                    id: doc.id,
                    data: doc.data()
                }))
            ))
        }
    }, [chatId])

    const sendMessage= (e)=>{
        e.preventDefault();

        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            email:state.email,
            pic:state.pic,
            name:state.username

        })
        
        setInput("")
    
        
    }



    return (
        <div className="chaty">
           
            <div className="chaty-header">
                <img style={{marginLeft:"5px",height:"50px" ,width:"50px",borderRadius:"20px"}}src={chatPic} />
               
                <div className="chaty-header-info">
                    <h5 style={{fontWeight:"bold",marginLeft:"7px"}}>{chatName}</h5>
                </div>
            </div>

            <div className="chaty-chatbox">
                <FlipMove>
                {messages.map(({id , data})=>(

                <Chat key={id} contents={data}  />
                ))}
                </FlipMove>
                
               
              
                
               
                

            </div>


            <div className="chaty-footer">
            {/* <i className="material-icons" style={{marginLeft:"1px",marginTop:"3px"}}>insert_emoticon</i> */}

            

            
            
            
                    
                    {/* <i className="material-icons"  style={{marginLeft:"2px"}} >
                    attach_file
                        </i>  */}

                {/* <div className="file-field input-field" style={{margin:"5px",marginRight:"2px"}}>
                <div  style={{border:"none",borderRadius:"100px",height:"15px",width:"15px"}} >
                    <button style={{border:"none",backgroundColor:"whitesmoke"}}>
                    <i className="material-icons"  style={{marginLeft:"2px"}} >
                    attach_file
                        </i>
                <input style={{width:20}} type="file" onChange={(e)=>UpdatePic(e.target.files[0])}/> 
                </button>
                
                </div>
                </div> */}
                

                <form >
                    {/* < Picker onEmojiClick={onEmojiClick} />  */}
                    {/* <Picker onEmojiClick={onEmojiClick}skinTone={SKIN_TONE_MEDIUM_DARK} />
                     { chosenEmoji && <EmojiData chosenEmoji={chosenEmoji}/> } */}



                    
                        <input style={{marginRight:"10px",borderRadius:"15px",padding:"1px", borderStyle:"hidden" , backgroundColor:"white",width:"95%",padding:"4px",marginLeft:"20px"}} 
                        placeholder="Type a message"
                        type="text"
                        value= {input}
                        onChange={e=>setInput(e.target.value)}
                        />
                        <button onClick={sendMessage} type="submit">Send</button>
                </form>
                

            </div>
       
            
        </div>
    )
}

export default ChatSide
