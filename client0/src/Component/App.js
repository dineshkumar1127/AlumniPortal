import React,{createContext,useEffect,useReducer,useContext} from 'react'
import {Switch, Route, BrowserRouter,useHistory} from 'react-router-dom'
import Nav from './Nav'
import Home from './Screens/home'
import Profile from './Screens/profile'
import Register from './Screens/register'
import SignIn from './Screens/signin'
import Message from './Screens/Message/message'
import UserProfile from './Screens/userProfile'
// import Modal from './Screens/modal'
import {reducer,initState} from '../reducers/userReducers'
// import { Provider } from 'react-redux'
// import store from '../Component/store'
import Reset from '../Component/Screens/passwordReset'



export const UserContext = createContext()

const Routing=()=>{
    const {state , dispatch} = useContext(UserContext)
    const history = useHistory()

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))

        if(user){
            dispatch({type:"USER",payload:user})
        }
        else{
            if(!history.location.pathname.startsWith('/reset'))
            history.push('/signin')
        }
    },[])

    return (

    <Switch>

        <Route exact path="/"><Home /></Route>
        <Route exact path="/profile"><Profile /></Route>
        <Route  path="/signin"><SignIn /></Route>
        <Route  path="/signup"><Register /></Route>
        <Route  path="/message"><Message /></Route>
        <Route path="/profile/:userId">< UserProfile /></Route>
        <Route exact path="/reset"><Reset /></Route>

    </Switch>
 )
}


const App=()=>{
    const [state,dispatch] = useReducer(reducer,initState)
    return (
        <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>

        <Nav />
        <Routing />

    

        
       

        </BrowserRouter>

        {/* <Provider store={store}>
            <Message />
        </Provider> */}
        </UserContext.Provider>


        
 
    )
}

export default App;