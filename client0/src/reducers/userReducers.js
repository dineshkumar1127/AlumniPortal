import { act } from "react-dom/test-utils"

export const initState = null

export const reducer = (state,action)=>{
    if(action.type==="USER"){
        return action.payload
    }
    
    if(action.type==="CLEAR"){
        return null
    }

    if(action.type === "UPDATEPIC"){
        return {
            ...state,
            pic:action.payload
        }
    }

    if(action.type === "EDITPROFILE"){
        return {
            ...state,
        username: action.payload.username,
        batch: action.payload.batch,
        company: action.payload.company,
        linkedIn: action.payload.linkedIn,
        twitter: action.payload.twitter,
        about: action.payload.about
        }
        }

        if(action.type === "UPDATEPASSWORD"){
            return {
                ...state,
                password:action.payload
            }
        }

    
    return state
}