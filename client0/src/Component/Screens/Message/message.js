import '../Message/message.css'
import React ,{useEffect , useState} from 'react' 
import ChatSide from './chatSide'
import Slidebar from './Slidebar'
import { provider } from './Firebase'
import { Provider } from 'react-redux'

import store from '../../store'

 



const Message=()=> {
    // const storee = createStore(allreducer)

    return (
        <div className="chatModule">
            <div className="chatModule-body">
    
            <Provider store={store}>

   
                <Slidebar  />
                    
                
                        <ChatSide   />
                        
                        </Provider> 
            </div>
          
            
        </div>
    )
}

export default Message
