import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";


const resumeSlice = createSlice({
    name:'resume',
    initialState: [],
    reducers: {
        addResume(state,action){
            state.push(action.payload);
            // console.log(action.payload);
            // console.log(state)
        },
        
        deleteResume(state,action){
            state.splice(action.payload,1)
        }
    }
})


export {resumeSlice};

export const {addResume, deleteResume} = resumeSlice.actions