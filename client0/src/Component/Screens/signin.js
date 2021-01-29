import React,{useState,useContext } from 'react'
import {Link , useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../App'








const SignIn = ()=>{

    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")



    const postdata=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:'rounded #3f51b5 indigo'})
            return;
        }
        fetch('/signin',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error , classes: "rounded #3f51b5 indigo"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch ({type:"USER", payload:data.user})
                M.toast({html: "Welcome" , classes: "rounded #3f51b5 indigo"})
                history.push('/profile')
            }
        })
    }





    return (
        <div className="random2">
            <div className="myCard">
                <div className="card auth-card input-field">
                    <h2 className="name" style={{ fontFamily:"fantasy", color:"rgb(255, 187, 0)"}}>Stay Connected</h2>
                
                    <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input
                    type="password"
                    placeholder="Password"
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                    />
                    <p/>
                    <button className="btn waves-effect waves-light #ef5350 red darken-1" type="submit" name="action" onClick= {()=>postdata()}
    
                    >
                    LogIn
                    </button>

                    <Link to="/signUp"> 
                    <h5 style={{ fontFamily:"initial" , color:"ButtonFace"}}> New ? Join Us</h5>
                    </Link>

                    <Link to="/reset"> 
                    <h6 style={{ fontFamily:"initial" , color:"ButtonFace"}}>Forgot password ?</h6>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default SignIn;