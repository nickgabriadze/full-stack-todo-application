import {createSlice} from "@reduxjs/toolkit";

interface UserState {
    username: string;
}

const initialState:UserState = {
    username: "",
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:{
        setTodoerUsername: (state, action) => {
            
         
            return {
                ...state,
                username: action.payload
            }
        },
    }



});

export const {setTodoerUsername} = userSlice.actions;
export default userSlice.reducer;