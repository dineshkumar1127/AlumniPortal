import React,{useState} from 'react'
import {Link , useHistory} from 'react-router-dom'
import M from 'materialize-css'


const SignUp=()=>{

  const history = useHistory()
  const [username , setUserName] = useState("")
  const [scholar , setScholar] = useState("")
  const [batch , setBatch] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
   
  
  
  const uploadField = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "Invalid Email",classes:'rounded #3f51b5 indigo'})
      return;
  }

      fetch("/signup",{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username,
          scholar,
          email,
          password,
          batch
        })
      }).then(res=>res.json()).then(data=>{

        if(data.error){
          M.toast({html: data.error , classes: "rounded #3f51b5 indigo"})
        }

        else{
          M.toast({html: data.message , classes: "rounded #4caf50 green"})
          history.push('/signin')
        }
      }).catch(err=>{
        console.log(err)
      })
     
   }


 




    return ( 
  
  <div className="random">
  <div className="myCard">
      <div className="card auth-cardd input-field">
          <h3 style={{ fontFamily:"serif", color:"rgb(255, 187, 0)"}}>Welcome To Our Family</h3>
          
          <input
         placeholder="User Name" 
              type="text"            
             value={username} 
              onChange={(e)=>setUserName(e.target.value)}
          /> 
          
          <input
             placeholder="Scholar Number" 
             type="text"            
            value={scholar} 
             onChange={(e)=>setScholar(e.target.value)}
          />

            <input
             placeholder="Batch" 
             type="text"            
            value={batch} 
             onChange={(e)=>setBatch(e.target.value)}
          />
        

            <input
            placeholder="Email" 
            type="text"            
           value={email} 
            onChange={(e)=>setEmail(e.target.value)}
          />

            <input
            placeholder="Password" 
            type="password"            
           value={password} 
            onChange={(e)=>setPassword(e.target.value)}
          />
          <p/>
          <button className="btn waves-effect waves-light #ef5350 red darken-1 " type="submit" name="action" onClick= {()=>uploadField()}
          >
          Register
          </button>

          <Link to="/signin"> 
          <h5 style={{ fontFamily:"initial" , color:"ButtonFace"}}>Already Member ?</h5>
          </Link>

      </div>
  </div>
</div>
  )
}

export default SignUp; 