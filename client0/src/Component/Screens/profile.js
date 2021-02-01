import React,{useState , useContext, useEffect , history , useRef} from 'react'
import { UserContext } from '../App'
import Modal from 'react-modal'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'


const Profile = ()=>{

    const EditModal = useRef(null)
    const PasswordModal = useRef(null)
    const {state , dispatch} = useContext(UserContext)
    const  [image, setImage] = useState("")
    const [pic , setPic] = useState([])
    const [modalIsOpen , setModalIsOpen] = useState(false)
    const [username , setUserName] = useState("")
    const [batch , setBatch] = useState("")
    const [company , setCompany] = useState("")
    const [linkedIn , setLinkedIn] = useState("")
    const [twitter , setTwitter] = useState("")
    const [about , setAbout] = useState("")
    const [data , setData] = useState("")

    const [email , setEmail] = useState("")
    const [oldpassword , setOldPassword] = useState("")
    const [newpassword , setNewPassword] = useState("")
    const [confirmnewpassword , setConfirmNewPassword] = useState("")
    const history = useHistory()
    


    useEffect(()=>{
        M.Modal.init(EditModal.current)
      },[])

      useEffect(()=>{
        M.Modal.init(PasswordModal.current)
      },[])


    useEffect(()=>{

        if(image){
            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset","alumni")
            data.append("cloud_name","dcirgll8n")

            fetch('https://api.cloudinary.com/v1_1/dcirgll8n/image/upload',{
                method:"post",
                body:data
            })
            .then(res=>res.json()).then(data=>{
                
                fetch('/updatePic',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"jozem "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json()).then(result=>{
                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                    dispatch({type:"UPDATEPIC",payload:result.pic})
                })
            })
            .catch(err=>{
                console.log(err)
            }) 
        }

    },[image])


    const UpdatePic = (file) =>{
        setImage(file)

    }


    useEffect(()=>{

        fetch('/myposts',{
            headers:{
                "Authorization":"jozem "+localStorage.getItem("jwt")
            }

        }).then(res=>res.json()).then(results=>{
            setPic(results.myposts)
        })
    },[])



//     useEffect(()=>{

//         if( username || batch || company || linkedIn || twitter){

//         fetch("/updateProfile",{
//             method:"put",
//             headers:{
//                 "Content-type":"application/json",
//                 "Authorization":"jozem "+localStorage.getItem("jwt")
                
//             },
//             body:JSON.stringify({
//                 username,
//                 batch,
//                 company,
//                 linkedIn,
//                 twitter
//             })
//         }).then(res=>res.json()).then(data=>{

//             // console.log(data)

//             // localStorage.setItem("user",JSON.stringify({...state ,username:data.username }))
//             //  dispatch ({type:"UPDATEUSERNAME", payload:data.username})
            
//             // localStorage.setItem("user",JSON.stringify({...state ,batch:data.batch }))
//             //  dispatch ({type:"UPDATEBATCH", payload:data.batch})
            
//             //  localStorage.setItem("user",JSON.stringify({...state ,company:data.company }))
//             //   dispatch ({type:"UPDATECOMPANY", payload:data.company})
            
//             //   localStorage.setItem("user",JSON.stringify({...state ,linkedIn:data.linkedIn }))
//             //     dispatch ({type:"UPDATELINKEDIN", payload:data.linkedIn})
            
//             //   localStorage.setItem("user",JSON.stringify({...state ,twitter:data.twitter }))
//             //     dispatch ({type:"UPDATETWITTER", payload:data.twitter})
         
//         }).catch(err=>{
//             console.log(err)
//         })

//         console.log(state)
//     }
    
        
//     },[username,batch,company,linkedIn,twitter])



// const updateprofile=()=>{
//     setUserName(username)
//     setBatch(batch)
//     setCompany(company)
//     setLinkedIn(linkedIn)
//     setTwitter(twitter)
// }


    const updateprofile=()=>{

       console.log(username) 

            fetch("/updateProfile",{
                method:"put",
                headers:{
                    "Content-type":"application/json",
                    "Authorization":"jozem "+localStorage.getItem("jwt")
                    
                },
                body:JSON.stringify({
                    username,
                    batch,
                    company,
                    linkedIn,
                    twitter,
                    about
                })
            }).then(res=>res.json()).then(data=>{
                
                console.log(data)
                if(data.error){
                    M.toast({html:data.error, classes:"rounder #3F51b5 indigo"})
                }
                else{
                   localStorage.setItem("user",JSON.stringify(data))
                   dispatch({type:"EDITPROFILE", payload:{username:data.username,batch:data.batch,company:data.company,linkedIn:data.linkedIn,twitter:data.twitter,about:data.about}})
                }
            }).catch(err=>{
                console.log(err)
            })
}




const updatepassword=()=>{
    
    fetch("/newpassword",{
        method:"put",
        headers:{
            "Content-type":"application/json",
            "Authorization":"jozem "+localStorage.getItem("jwt")
            
        },

        body:JSON.stringify({
            oldpassword,
            newpassword,
            confirmnewpassword
        })
    }).then(res=>res.json()).then(result=>{


        if(result.error){
            M.toast({html:result.error, classes:"rounder #3F51b5 indigo"})
        }

        localStorage.setItem("user",JSON.stringify({...state,password:result.password}))
        dispatch({type:"UPDATEPASSWORD",payload:result.password})
        M.toast({html:"Password Successfully Updated", classes:"rounder #3F51b5 indigo"})
        history.push('/signin')
        
    })
}





    return (
    
    <div>
        <div className="my rightl center" style={{height:"100%",width:"90%"}} >
        <div className="home">
            <div className="card input-field " style={{backgroundColor:"ButtonFace",margin:"10px auto",maxWidth:"1000px",padding:"30px",textAlign:"center",height:"100%" ,width:"100%",marginTop:"10px"}}>



                <a className="btn-floating btn-small waves-effect waves-light red right"><i data-target="modal-password" className="material-icons  modal-trigger">add</i></a>

                <div id="modal-password" className="modal" style={{width:"500px"}} ref={PasswordModal}>

                <div className="row" >
                <p  style={{textAlign:"center",fontWeight:"bold" , fontSize:"30px"}}>Change Password</p>

                <div className="input-field col s6" style={{marginBottom:"50px",width:"100%"}}>
                <i className="material-icons prefix">account_circle</i>
                <input id="icon_telephone" type="password" className="validate" placeholder="Old Password" value={oldpassword}  onChange={(e)=>setOldPassword(e.target.value)}/>
                </div>

                <div className="input-field col s6" style={{marginBottom:"50px",width:"100%"}}>
                <i className="material-icons prefix">account_circle</i>
                <input id="icon_telephone" type="password" className="validate" placeholder="New Password" value={newpassword} onChange={(e)=>setNewPassword(e.target.value)} />
                </div>

                <div className="input-field col s6" style={{marginBottom:"50px",width:"100%"}}>
                <i className="material-icons prefix">account_circle</i>
                <input id="icon_telephone" type="password" className="validate" placeholder="Confirm New Password" value={confirmnewpassword}  onChange={(e)=>setConfirmNewPassword(e.target.value)}/>
                </div>

                </div>

                <div className="modal-footer">
                <button className="btn waves-effect waves-light #ef5350 red darken-1 " style={{marginRight:"3px"}}onClick={()=>{ M.Modal.getInstance(PasswordModal.current).close()
                }}>Close</button>
                
                <button className="btn waves-effect waves-light #ef5350 red darken-1 "style={{marginRight:"3px"}} onClick={()=>{{updatepassword()} M.Modal.getInstance(PasswordModal.current).close()}
                }>Update</button>
                </div>

                </div>





                 <div>
                <img className="be6sR left" style={{width:"200px",height:"200px",borderRadius:"100px",marginTop:"12px",marginLeft:"10px"}}
                src={state ? state.pic : "loading"}
                />
                </div> 

              
<div >
                <div className="file-field input-field" style={{margin:"10px"}}>
                <div  style={{border:"none",borderRadius:"100px",height:"205px",width:"200px"}} >
                    <button style={{border:"none",backgroundColor:"white"}}>
                <input style={{width:200}} type="file" onChange={(e)=>UpdatePic(e.target.files[0])}/> 
                </button>
                
                </div>
                </div>



                    <div className="mail ">
                    <h3 style={{color:"black",textAlign:"center",fontWeight:"bold"}}>{state ? state.email : "loading!"} </h3>
                    </div>

                    <div className="details center">
                     <h5 style={{color:"black",textAlign:"center",fontWeight:"bold"}}>{state ? state.username:"loading!"} ({state ? state.batch:"loading!"})</h5>
                    <h5 style={{color:"black",textAlign:"center",fontWeight:"bold"}}>({state ? state.scholar:"loading!"})</h5>
                    </div>


                    </div>


                    {/* <div className="ancher right">
                    <button onClick={()=>setModalIsOpen(true)}>Edit Profile</button> 
                    <div>
                    <Modal isOpen={modalIsOpen} style={{width:"50%"}}>
                    <div className="card-panel teal">
                    <span className="white-text" style={{textAlign:"center"}}>Details</span>
                    
                    </div>

                    

                    
                  <div className="row">
                    <form className="col s12" style={{width:"80%",padding:"80px"}}>

                     <div className="row">

                        <div className="input-field col s6" style={{marginBottom:"50px"}}>
                        <i className="material-icons prefix">account_circle</i>
                        <input id="icon_telephone" type="text" className="validate" placeholder="UserName" value={username} onChange={(e)=>setUserName(e.target.value)}/>
                        
                        </div>

                        <div className="input-field col s6" style={{marginBottom:"50px"}}>
                        <i className="material-icons prefix">mail</i>
                        <input id="icon_telephone" type="tel" className="validate"  placeholder="Batch"  value={batch} onChange={(e)=>setBatch(e.target.value)} />
                        </div>


                        <div className="input-field col s6" style={{marginBottom:"50px"}} >
                        <i className="material-icons prefix">local_mall</i>
                        <input id="icon_telephone" type="tel" className="validate"  placeholder="Company"  value={company} onChange={(e)=>setCompany(e.target.value)} />
                        </div>

                        <div className="input-field col s6" style={{marginBottom:"50px"}}>
                        <i className="material-icons prefix">contact_mail</i>
                        <input id="icon_telephone" type="tel" className="validate"  placeholder="LinkedIn"  value={linkedIn} onChange={(e)=>setLinkedIn(e.target.value)} />
                        </div>

                        <div className="input-field col s6" >
                        <i className="material-icons prefix">contact_mail</i>
                        <input id="icon_telephone" type="tel" className="validate"  placeholder="Twitter"  value={twitter} onChange={(e)=>setTwitter(e.target.value)} />
                        </div>


                    </div>
                 </form>
                </div>


                    <div>
                      <button className="waves-effect waves-light btn right" style={{margin:"5px"}} onClick={()=>updateprofile().setModalIsOpen(false)}>Save</button> 
                     <button className="waves-effect waves-light btn right" style={{margin:"5px"}} onClick={()=>setModalIsOpen(false)}>Close</button>
                    </div>

                    </Modal>
                    </div>
                    </div> */}


                    
                     <i data-target="modal" className="material-icons modal-trigger  " style={{marginLeft:"10px"}}>edit</i>
             <div id="modal" className="modal" ref={EditModal}>

             

             <div className="row">
             <p  style={{textAlign:"center",fontWeight:"bold" , fontSize:"30px"}}>Details</p>

                <div className="input-field col s6" style={{marginBottom:"50px"}}>
                <i className="material-icons prefix">account_circle</i>
                <input id="icon_telephone" type="text" className="validate" placeholder="UserName" value={username} onChange={(e)=>setUserName(e.target.value)}/>

                </div>

                <div className="input-field col s6" style={{marginBottom:"50px"}}>
                <i className="material-icons prefix">mail</i>
                <input id="icon_telephone" type="tel" className="validate"  placeholder="Batch"  value={batch} onChange={(e)=>setBatch(e.target.value)} />
                </div>


                <div className="input-field col s6" style={{marginBottom:"50px"}} >
                <i className="material-icons prefix">local_mall</i>
                <input id="icon_telephone" type="tel" className="validate"  placeholder="Company"  value={company} onChange={(e)=>setCompany(e.target.value)} />
                </div>

                <div className="input-field col s6" style={{marginBottom:"50px"}}>
                <i className="material-icons prefix">contact_mail</i>
                <input id="icon_telephone" type="tel" className="validate"  placeholder="LinkedIn"  value={linkedIn} onChange={(e)=>setLinkedIn(e.target.value)} />
                </div>

                <div className="input-field col s6" >
                <i className="material-icons prefix">contact_mail</i>
                <input id="icon_telephone" type="tel" className="validate"  placeholder="Twitter"  value={twitter} onChange={(e)=>setTwitter(e.target.value)} />
                </div>

                <div className="input-field col s6" >
                <i className="material-icons prefix">contact_mail</i>
                <input id="icon_telephone" type="tel" className="validate"  placeholder="About Me"  value={about} onChange={(e)=>setAbout(e.target.value)} />
                </div>

                </div>

                

            <div className="modal-footer">
                <button className="btn waves-effect waves-light #ef5350 red darken-1 " style={{marginRight:"3px"}}onClick={()=>{ M.Modal.getInstance(EditModal.current).close()
                }}>Close</button>
                
                <button className="btn waves-effect waves-light #ef5350 red darken-1 "style={{marginRight:"3px"}} onClick={()=>{{updateprofile()} M.Modal.getInstance(EditModal.current).close()}
                }>Save</button>
            </div>


          </div>







                  <div className="colla" style={{padding:"40px",width:"50%"}}>
                    <ul className="collapsible">
                    <li>
                         <div className="collapsible-header" style={{height:"25%"}}>
                      <img style={{height:"20px",width:"20px"}} src="https://www.clipartmax.com/png/middle/292-2924926_office-working-icon-working-hours-icon.png" />
                      <a href={state ? state.company : "loading!"} target="_blank">Company</a>
                        </div>
                     
                 </li>
                     <li>
                         <div className="collapsible-header " style={{height:"25%"}}>
                         <img style={{height:"20px",width:"20px"}} src="https://www.flaticon.com/svg/static/icons/svg/61/61109.svg" />
                         <a href={state ? state.linkedIn : "loading!"} target="_blank"> LinkedIn</a>
                         </div>
                         
                     </li>

                     <li>
                         <div className="collapsible-header " style={{height:"25%"}}>
                         <img style={{height:"20px",width:"20px"}} src="https://cdn3.iconfinder.com/data/icons/picons-social/57/43-twitter-512.png" />
                         <a href={state ? state.twitter : "loading!"} target="_blank"> Twitter</a>
                         </div>
                     </li>
                     </ul>

                  </div>
                  </div>

                  

                  <h2 style={{textAlign:"center",fontFamily:"fantasy"}}>Posts</h2>
                     <br/>
        

                    <div className="gallery"  style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                        
                        {
                        pic.map(item=>{
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
    )
}

export default Profile;