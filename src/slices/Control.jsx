import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
const initialState = {
    mobilePlayer:false
}

const ControlsSlice = createSlice({
    name:"NavbarSlice",
    initialState: initialState,
    reducers:{
        
        setmobilePlayer(state,value){
            state.mobilePlayer = value.payload;
        }
       
    }
})
export const {mobilePlayer,setmobilePlayer} = ControlsSlice.actions;
export default ControlsSlice.reducer;

