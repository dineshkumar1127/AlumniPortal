import React ,{useContext}from 'react'
import { useDispatch } from 'react-redux'
import { setChat } from '../../chatSlicee'
import { UserContext } from '../../App'





    function SlideBarChat({id , chatName , pic , email}) {

        const dispatchh = useDispatch()   
        const {state , dispatch} =  useContext(UserContext)           
  console.log(email)

 
        return (
            
            <div onClick={()=> {
                dispatchh (
                    setChat ({
                        chatId: id,
                        chatName: chatName,
                        chatPic: pic
                    })
                )
             }} className="Sidebar-chaty">      
                    <div className="slidy_chat" style={{padding:"10px"}}>
                        <img style={{marginLeft:"5px",height:"50px" ,width:"50px",borderRadius:"20px"}}src={pic}  />
                        <h5 style={{marginLeft:"10px",fontWeight:"bold",fontSize:"15px"}}>{chatName}</h5>
                        
        
                    </div>
                </div>
    )
}

export default SlideBarChat
