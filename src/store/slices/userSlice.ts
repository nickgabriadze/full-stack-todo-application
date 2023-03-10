import {createSlice} from "@reduxjs/toolkit";

interface UserState {
    username: string;
    stayLoggedIn: boolean
}

const initialState:UserState = {
    username: "",
    stayLoggedIn: false
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

        setStayLoggedIn: (state, action) => {
            return {
                ...state,
                stayLoggedIn: action.payload
            }
        }
    }



});

export const {setTodoerUsername, setStayLoggedIn} = userSlice.actions;
export default userSlice.reducer;