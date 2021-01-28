import React,{useState,useEffect,useContext ,useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import Modal from 'react-modal'
import { UserContext } from '../App'


const Home = ()=>{

const commentModal = useRef(null)
const {state , dispatch } = useContext(UserContext)    
const history = useHistory()
const [body , setBody] = useState("")
const [link , setLink] = useState("")
const [image , setImage] = useState("")
const [url , setUrl] = useState("")
const [data , setData] = useState([])





useEffect(()=>{
    M.Modal.init(commentModal.current)
  },[])

  

useEffect(()=>{

    if(url){
        fetch('/create',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"jozem "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                body,
                link,
                photo:url,

            })
        }).then(res=>res.json()).then(data=>{

            if(data.error){
                M.toast({html: data.error , classes: "rounded #3f51b5 indigo"})
            }
            else{
                M.toast({html:"Post Created" , classes: "rounded #3f51b5 indigo"})
                history.push('/')
                window.location.reload()
            }
             
        })
    }

},[url])





const postDetail =()=>{

const data = new FormData()
data.append("file",image)
data.append("upload_preset","alumni")
data.append("cloud_name","dcirgll8n")

fetch('https://api.cloudinary.com/v1_1/dcirgll8n/image/upload',{
    method:"post",
    body:data
})
.then(res=>res.json()).then(savedata=>{
    setUrl(savedata.url)
})
.catch(err=>{
    console.log(err)
})
}


useEffect(()=>{
    
    fetch('/allposts',{
        headers:{
            "Authorization":"jozem "+ localStorage.getItem("jwt")
        }
    }).then(res=>res.json()).then(result=>{
    
        setData(result.posts)
        
    })
},[])


const deletepost =(postId)=>{
    fetch('/removeposts/'+postId,{
        method:"delete",
        headers:{
            "Authorization":"jozem "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json()).then(result=>{

        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setData(newData)
    })
}



// const makeComment = (textt,postIdt)=>{

//     fetch('/comment',{
//         method:"put",
//         headers:{
//             "Content-Type":"application/json",
//             "Authorization":"jozem "+localStorage.getItem("jwt")
            
//         },
//         body:JSON.stringify({
//             text:textt,
//             postId:postIdt
//         })
//     }).then(res=>res.json()).then(result=>{
//         // const newData  =data.map(item=>{

//         //     if(item._id == result._id){
//         //         return result
//         //     }
//         //     else{
//         //         return item
//         //     }
//         // })
//         // setData(newData)
//         console.log(result)
//     }).catch(err=>{
//         console.log(err)
//     })
// }






    return (

            <div className="Example" style={{display:"flex"}}>
            <div className="leftt left" style={{height:"100%",width:"30%" }}>
                <div className="row">
                <div className="col s12 m6">
                  <div className="card grey darken-1" >
                    <div className="card-content white-text" >
                        <img key="0" style={{height:"100px",width:"100px",borderRadius:"100px"}} src={state ? state.pic : "loading!"}/>
                             <span className="card-title" style={{fontWeight:"bold",color:"black"}}>{state ? state.username : "loading!"}<br/>({state ? state.scholar : "loading!"})</span>
                                <p  style={{fontWeight:"bold",fontSize:"12px",color:"black"}}>{state ? state.about : "loading !.."}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>



         <div className="my rightl right" style={{height:"100%",width:"70%"}} >
          <div className="home">
            <div className="card input-field " style={{backgroundColor:"ButtonFace",margin:"10px auto",maxWidth:"1000px",padding:"30px",textAlign:"center",height:"100%" ,width:"70%",marginTop:"10px"}}>
            <input  type="text"
             placeholder="Start a Post"
             value={body}
             onChange={(e)=>setBody(e.target.value)}
             />
             <input type="text"
             placeholder="Link"
             value={link}
             onChange={(e)=>setLink(e.target.value)}
             />

                <div className="file-field input-field">
                <div className="btn waves-effect waves-light #ef5350 red darken-1">
                <span><i key="one" className="material-icons">add_a_photo</i></span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper input-field">
                <input className="file-path validate" type="text"/>
                </div>
                </div>

                <button  className="btn waves-effect waves-light #ef5350 red darken-1 " type="submit" name="action" onClick={()=>postDetail()}
                > Post
                </button>
        </div> 
        



                {data.map(item=>{

                        return (
                            
                            <div className="col s12 m7" style={{padding:"10px"}}>
                            <div className="card horizontal"style={{backgroundColor:"ButtonFace",marginBottom:"20px"}} >
                            <img style={{height:"50px",width:"50px",borderRadius:"100px",margin:"10px 10px"}} src={item.postedBy.pic}/>
                            <div className="card-image" style={{backgroundColor:"ButtonFace"}} >

                            <h4 className="header" style={{fontWeight:"bold"}}><Link to ={ item.postedBy._id !== state._id ? '/profile/'+item.postedBy._id : '/profile'} style={{color:"black"}} >{item.postedBy.username}</Link></h4>
                                <img key="0" src={item.photo} alt={item.title}/> 
                            </div>



                            <div className="card-stacked">                             
                                <div className="card-content">
                                     { item.postedBy._id == state._id ?
                                    <i key={item._id} className="material-icons" style={{float:"right"}} onClick={()=>{deletepost(item._id)}}>delete</i>

                                     :
                                     
                                     <i className="material-icons"  style={{float:"right"}}>more_horiz</i>
                                     
                                     }

                                    <br />
                                    <br />
                                <p style={{fontWeight:"bold"}}>{item.body}</p>
                                </div>

                                
                                
                                <div className="card-action" style={{overflow:"auto"}}>
                                    <a key={item._id} href={item.link} target="_blank" style={{color:"skyblue"}}>{item.link}</a>
                                </div>

                            </div>
                            </div>
                        </div>
                        
                        )
                })}
{/* 
                                <div id="modal" className="modal" ref={commentModal}>    
                                <div className="row">
                                    <p  style={{textAlign:"center",fontWeight:"bold" , fontSize:"30px"}}>Comments</p>

                                    <form onSubmit={(e)=>{
                                    e.preventDefault()
                                       makeComment(e.target[0].value,state._id)
                                    }}>
                                    <input style={{width:"80%",marginLeft:"70px"}} type="text" placeholder=" add a comment"/>
                                    </form>
                                    </div>
                                    
                                     </div> */}
             </div>

            </div>

         </div>
        //  </div>
        //  </div>


    )
}

export default Home;