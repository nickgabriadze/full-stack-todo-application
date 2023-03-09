import {createSlice} from "@reduxjs/toolkit";

interface UserState {
    username: string;
}

const initialState:UserState = {
    username: ""
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:{
        setUsername: (state, action) => {
            return {
                ...state,
                username: action.payload.username
            }
        }
    }



});

export const {setUsername} = userSlice.actions;
export default userSlice.reducer;