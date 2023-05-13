import { createSlice } from "@reduxjs/toolkit";


const selectSlice = createSlice({
    name:'select id',
    initialState: [0],
    reducers: {
        Select(state,action){
            state.push(action.payload) ;
        },
    }
})


export {selectSlice};

export const {Select} = selectSlice.actions