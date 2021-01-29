import { Avatar, TextField } from '@material-ui/core'
import React , { forwardRef, useContext} from 'react'
import { UserContext } from '../../App'
import '../Message/message.css'
// import  Avatar   from '@material-ui/core'


const Chat= forwardRef(({
     id ,
     contents:{ timestamp , message , pic , email , name},
    },
    ref
    )=> {

        const { state, dispatch} = useContext(UserContext)
        
    return (
        // <div className="conversation" style={{display:"flex"}} ref={ref}>
        //     {state.email==email ?  <Avatar src={pic}/> : <Avatar className="right" src={pic}/>}
        //     <div className={state.email==email ? "chaty-sender" : "chaty-receiver"}>
            
        //     <p>
               
        //     {/* <img style={{marginLeft:"5px",height:"50px" ,width:"50px",borderRadius:"20px",alignContent:"right"}}src={pic}  /> */}
        //             {message} </p>
                    
        //             <span style={{font:"menu"}} className="date-time">
        //                {new Date(timestamp?.toDate()).toLocaleTimeString()}
        //             </span>
                    
        //             </div>
        //             </div>

        <div ref={ref}>
            {/* {textpic ? 
            <div>
               <Avatar  className="message_photo" src={pic}/>
                <img src={textpic} />
                <small>{new Date(timestamp?.toDate()).toLocaleTimeString()}</small>
            </div>
            : */}
            <div className={state.email==email ? "Conversation_sender" : "Conversation"}>
               <Avatar  className="message_photo" src={pic}/>
                <p>{message}</p>
                <small>{new Date(timestamp?.toDate()).toLocaleTimeString()}</small>
            </div>
        {/* } */}
        </div>
        
    )
}
)
export default Chat
