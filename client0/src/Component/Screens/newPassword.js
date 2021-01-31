import React,{useState,useContext } from 'react'
import {Link , useHistory , useParams} from 'react-router-dom'
import M from 'materialize-css'








const NewPassword = ()=>{

    const history = useHistory()
    const [password , setPassword] = useState("")
    const {token} = useParams()

    console.log(token)



    const newpassword=()=>{
      
        fetch('/newpassword',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password:password,
                token:token
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error , classes: "rounded #3f51b5 indigo"})
            }
            else{
                M.toast({html:data.message, classes: "rounded #4caf50 greens"})
                history.push('/signin')
            }

        }).catch(err=>{
            console.log(err)
        })


    }





    return (
        <div className="random2">
            <div className="myCard">
                <div className="card auth-card input-field">
                    <h2 className="name" style={{ fontFamily:"fantasy", color:"rgb(255, 187, 0)"}}>Stay Connected</h2>
                

                    <input
                    type="password"
                    placeholder="Enter New Password"
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                    />

                    <p/>
                    <button className="btn waves-effect waves-light #ef5350 red darken-1" type="submit" name="action" onClick= {()=>newpassword()} >
                    Update Password
                    </button>

                </div>
            </div>
        </div>
    )
}

export default NewPassword;