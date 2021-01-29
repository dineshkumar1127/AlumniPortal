import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../Component/chatSlicee'

export default configureStore({
    reducer: {
        chat: chatReducer
    }
})