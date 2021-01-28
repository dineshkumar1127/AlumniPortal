
import React,{useState , useContext, useEffect , history} from 'react'
import { UserContext  } from '../App'
import Modal from 'react-modal'
import M from 'materialize-css'
import {useParams}  from 'react-router-dom'


const UserProfile = ()=>{

    
    
    const [pic , setPic] = useState([])
    const [username , setUserName] = useState("")
    const [batch , setBatch] = useState("")
    const [company , setCompany] = useState("")
    const [linkedIn , setLinkedIn] = useState("")
    const [twitter , setTwitter] = useState("")
    const [data , setData] = useState("")


    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userId} = useParams()



    useEffect(()=>{
        fetch(`/user/${userId}`,{
            headers:{
                "Authorization":"jozem "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result=>{
            
           setProfile(result)
        })
    },[])


    useEffect(()=>{

        fetch('/myposts',{
            headers:{
                "Authorization":"jozem "+localStorage.getItem("jwt")
            }

        }).then(res=>res.json()).then(results=>{
            
            setPic(results.myposts)
        })
    },[])



   

    return (
        <>
        {userProfile
        ?
    
    <div>
        <div className="my rightl center" style={{height:"100%",width:"90%"}} >
        <div className="home">
            <div className="card input-field " style={{backgroundColor:"ButtonFace",margin:"10px auto",maxWidth:"1000px",padding:"30px",textAlign:"center",height:"100%" ,width:"100%",marginTop:"10px"}}>


                 <div>
                <img className="be6sR left" style={{width:"200px",height:"200px",borderRadius:"100px",marginTop:"12px",marginLeft:"10px"}}
                src={userProfile.user.pic}
                />
                </div> 



                    <div className="mail ">
                    <h3 style={{color:"black",textAlign:"center" ,fontWeight:"bold"}}>{userProfile.user.email} </h3>
                    </div>

                    <div className="details center">
                     <h5 style={{color:"black",textAlign:"center",fontWeight:"bold"}}>{userProfile.user.username} ({userProfile.user.batch})</h5>
                    <h5 style={{color:"black",textAlign:"center",fontWeight:"bold"}}>({userProfile.user.scholar})</h5>
                    <p style={{color:"black",textAlign:"center",fontWeight:"bold"}}>Bio :- {userProfile.user.about}</p>
                    </div>
                    



                  <div className="colla" style={{padding:"40px",width:"25%",marginTop:"20px"}}>
                    <ul className="collapsible">
                    <li>
                         <div className="collapsible-header" style={{height:"25%"}}>
                      <img style={{height:"20px",width:"20px"}} src="https://www.clipartmax.com/png/middle/292-2924926_office-working-icon-working-hours-icon.png" />
                      <a href={userProfile.user.companyLink} target="_blank">Company</a>
                        </div>
                 </li>
                     <li>
                         <div className="collapsible-header " style={{height:"25%"}}>
                         <img style={{height:"20px",width:"20px",marginRight:"3px"}} src="https://www.flaticon.com/svg/static/icons/svg/61/61109.svg" />
                         <a href={userProfile.user.linkedIn} target="_blank"> LinkedIn</a>
                         </div>

                     </li>

                     <li>
                         <div className="collapsible-header " style={{height:"25%"}}>
                         <img style={{height:"20px",width:"20px"}} src="https://cdn3.iconfinder.com/data/icons/picons-social/57/43-twitter-512.png" />
                         <a href={userProfile.user.twitter} target="_blank"> Twitter</a>
                         </div>
                     </li>
                     </ul>

                  </div>
                  </div>

                  <h2 style={{textAlign:"center",fontFamily:"fantasy"}}>Posts</h2>
                     <br/>
        

                    <div className="gallery">
                        {
                        userProfile.posts.map(item=>{
                            return(
                            <img className="item"  style={{width:"200px",height:"200px",borderRadius:"40px",marginRight:"5px",marginBottom:"5px",marginLeft:"5px",border:"groove"}}
                            key={item._id}
                            src={item.photo}
                            alt={item.title}
                            />
                            )
                        })
                        }

                        </div>
                  </div> 
                  </div>      
    </div>

    :

    <h2 style={{fontFamily:"Grand Hotel"}}>loading.....!</h2>}
    </>
    )
}

export default UserProfile;