import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
const initialState = {
    mobilePlayer:false,
    timeProgress : 0,
    isPlaying : false,
    duration : 0
}

const ControlsSlice = createSlice({
    name:"NavbarSlice",
    initialState: initialState,
    reducers:{
        
        setmobilePlayer(state,value){
            state.mobilePlayer = value.payload;
        },
        setTimeProgress(state,value){
            state.timeProgress = value.payload;
        },
        setIsPlaying(state,value){
            state.isPlaying = value.payload;
        },
        setDuration(state,value){
            state.duration = value.payload;
        },
       
    }
})
export const {mobilePlayer,setmobilePlayer,duration,setDuration,setIsPlaying,isPlaying,timeProgress,setTimeProgress} = ControlsSlice.actions;
export default ControlsSlice.reducer;

