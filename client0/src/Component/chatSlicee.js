import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice ({
    name:"chat",
    initialState:{
        chatId:null,
        chatName:null,
        chatPic:null
    },
    reducers:{
        setChat : (state , action)=>{
            state.chatId = action.payload.chatId;
            state.chatName = action.payload.chatName;
            state.chatPic = action.payload.chatPic
        },
    },
});

export const  { setChat } = chatSlice.actions;

export const selectChatName = (state)=>state.chat.chatName;
export const selectChatId = (state)=>state.chat.chatId;
export const selectChatPic = (state)=>state.chat.chatPic;

export default chatSlice.reducer;