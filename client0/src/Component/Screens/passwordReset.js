import React,{useState,useContext } from 'react'
import {Link , useHistory} from 'react-router-dom'
import M from 'materialize-css'








const PasswordReset = ()=>{

    const history = useHistory()
    const [email , setEmail] = useState("")




    const resetpassword=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:'rounded #3f51b5 indigo'})
            return;
        }
        fetch('/resetpassword',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
            })
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html: data.error , classes: "rounded #3f51b5 indigo"})
            }
            else{
                M.toast({html: data.message , classes: "rounded #3f51b5 indigo"})
                history.push('/signin')
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
                    <p/>
                    <button className="btn waves-effect waves-light #ef5350 red darken-1" type="submit" name="action" onClick= {()=>resetpassword()}
    
                    >
                    Reset Password
                    </button>

                    <Link to="/signin"> 
                    <h5 style={{ fontFamily:"initial" , color:"ButtonFace"}}>Go Back</h5>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset;