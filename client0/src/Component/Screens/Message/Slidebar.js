import '../Message/message.css'
import React ,{useContext , useState , useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import SlideBarChat from './SlideBarChat'
import { UserContext } from '../../App'
import db from './Firebase'
import M from 'materialize-css'


function Slidebar() {
    const searchModal = useRef(null)
    const {state , dispatch } = useContext(UserContext)  
    const [chats, setChats] = useState([])
    const [search , setSearch] = useState('')
    const [user , setUser] = useState([])


    useEffect(()=>{
      M.Modal.init(searchModal.current)
    },[])
    
    

 



    
    useEffect(() => {
      db.collection('chats').onSnapshot((snapshot) =>
        setChats(snapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data()
        })))
      )
    }, []);



    // const SearchUser=(query)=>{
    //   setSearch(query)
    
    //   fetch('/searchUsers',{
    //     method:"post",
    //     headers:{
    //       "Content-Type":"application/json"
    //     },
    //     body:JSON.stringify({
    //       query
    //     })
    //   }).then(res=>res.json()).then(result=>{
        
    //     setUser(result.user)
        
    //   })  
    // }

    // const addchat =(item)=>{

    //   const chatName = item.username
    //   const pic = item.pic
    //   const email = item.email

    //     if(chatName && pic) {
    //     db.collection('chats').add({
    //         chatName: chatName,
    //         pic: pic,
    //         email: email
    //     })
    // }
    // }

    const addchat =()=>{

      const chatName = prompt("Give Title for your Room ")
      const pic = state ? state.pic :"loading !"

        if(chatName && pic) {
        db.collection('chats').add({
            chatName: chatName,
            pic:pic
        })
    }
    }



    return (

        

        <div className="slidy">
                    {/* ONE */}
            <div className="slidy-left">
                <img style={{height:"10vh" , width:"10vh" ,borderRadius:"30px",marginTop: "5px"}} src={state ? state.pic : "loading!"}/>
                <span className="card-title" style={{color:"black",fontWeight:"bold",marginRight:"20px",marginLeft:"0px",fontSize:"25px",marginTop: "5px"}}>{state ? state.username : "loading!"}</span>
            




                        {/* TWO PERSONAL CHAT CODE  */}
            {/* <i data-target="modal" className="material-icons modal-trigger  " style={{marginLeft:"10px"}}>search</i>
             <div id="modal" className="modal" ref={searchModal}>
                 <div className="modal-content" style={{color:"black"}}>
                     <input type="text" placeholder=" Search Users to Make Convo" value={search} onChange={(e)=>SearchUser(e.target.value)} />
                     
                     <ul class="collection">
                     {
                  user.map(item=>{
                  return   <li className="collection-item"  onClick = {()=>{{addchat(item)} M.Modal.getInstance(searchModal.current).close()
                    setSearch('')}} style={{color:"black"}} style={{justifyContent:"space-between"}}><img src={item.pic}/> {item.username} <br/> {item.email} </li>
                  })
                }
                    </ul>
                            
                        
                       
                </div>

            <div className="modal-footer">
                <button className="btn waves-effect waves-light #ef5350 red darken-1 " onClick={()=>{ M.Modal.getInstance(searchModal.current).close()
                setSearch('')}}>Close</button>
            </div>
          </div> */}


          </div> 

        

            

                   

                        {/* THREE */}
        <div className="main_sildy-chat" style={{overflow:"auto"}}>
        <h6 style={{textAlign:"center" ,fontWeight:"bolder" , cursor:"pointer" }} onClick={()=>addchat()}>Create Rooms</h6>

        {chats.map(({ id, data: { chatName , pic }})=>(
       
       <SlideBarChat key={id} id={id} chatName={chatName} pic={pic}/>



              ))} 

            </div>
            
        </div> 
    )
}

export default Slidebar
