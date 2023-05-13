import { configureStore } from "@reduxjs/toolkit";
import { resumeSlice } from "./slices/resume";
import {selectSlice} from './slices/select'

const store = configureStore({
    reducer: {
        resumes: resumeSlice.reducer,
        selectid : selectSlice.reducer
    },
})

export default store;