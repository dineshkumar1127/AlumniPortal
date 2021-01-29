import '../App.css'
import React,{useContext , useRef , useState , useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from './App'
import M from 'materialize-css'




const Nav= ()=>{

  const searchModal = useRef(null)
  const [search , setSearch] = useState('')
  const [userDetail , setUserDetail] = useState([])
  const {state , dispatch} = useContext(UserContext)
  const history = useHistory()



useEffect(()=>{
  M.Modal.init(searchModal.current)
},[])





  const renderList=()=>{

    if(state){
      return [

              <li key="0" style={{color:"black"}}><i data-target="modal1" className="material-icons modal-trigger ">search</i></li>,
              <li key="1"><Link to="/" style={{color:"black"}}><i className="material-icons">home</i></Link></li>,
              <li key="2"><Link to="/message" style={{color:"black"}}><i className="material-icons">message</i></Link></li>,
              <li key="3"><Link to="/profile" style={{color:"black"}}><i className="material-icons">person_pin</i></Link></li>,
              <li key="4"> 
               <button className="btn waves-effect waves-light #ef5350 red darken-1 " type="submit" name="action" onClick={()=>{
                 localStorage.clear()
                 dispatch({type:"CLEAR"})
                 history.push('/signin')
               }}> LogOut
              </button>
              </li>
      ]
    }
    else{
      return [
  
              <li key="5"><Link to="/signin" style={{color:"black", fontWeight:"bold",fontSize:"20px"}}>LogIn</Link></li>,
              <li key="6"><Link to="/signup" style={{color:"black",fontWeight:"bold",fontSize:"20px"}}>Register</Link></li>
    
      ]
    }
  }


  const fetchUsers=(query)=>{
    setSearch(query)
  
    fetch('/searchUsers',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json()).then(result=>{
      console.log(result)
      setUserDetail(result.user)
    })  
  }

  return (
        <nav>
          <div  className="nav-wrapper grey" style={{ position:"fixed" , top:"1" ,width:"100%" , height:"70px",zIndex:"100"}}>
          <Link to={state ? '/' : '/signin'} className="brand-logo left" style={{fontFamily:"fantasy",color:"black",textAlign:"justify"}}><h4>Stay Connected</h4></Link>
          <ul id="nav-mobile" className="right">
          {renderList()}
          </ul>
          </div>

          <div id="modal1" className="modal" ref={searchModal}>
            <div className="modal-content" style={{color:"black"}}>
              <input type="text" placeholder=" Search Users" value={search} onChange={(e)=>fetchUsers(e.target.value)} />


              <ul className="collection">
                {
                  userDetail.map(item=>{
                  return <Link to={state._id !== item._id ? "/profile/"+item._id  : "/profile"} onClick = {()=>{ M.Modal.getInstance(searchModal.current).close()
                    setSearch('')}} style={{color:"black"}}> <li className="collection-item"><img src={item.pic}/> {item.username} <br/> {item.email} </li>  </Link>
                  })
                }
              
              </ul>
            </div>

            <div className="modal-footer">
              <button className="btn waves-effect waves-light #ef5350 red darken-1 " onClick={()=>{ M.Modal.getInstance(searchModal.current).close()
              setSearch('')}}>Close</button>
            </div>
          </div>

          
        </nav>

   
  )
}



export default Nav;