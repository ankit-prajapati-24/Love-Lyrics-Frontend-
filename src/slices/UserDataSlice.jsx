import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Image:"",
    userdata:localStorage.getItem("userdata")?JSON.parse(localStorage.getItem("userdata")):"",
    SignData:"",
    isLogin:false,
    query:"",
    token:localStorage.getItem("token")?localStorage.getItem("token"):"",
    search:false
}

const userDataSlice = createSlice({
    name:"User",
    initialState:initialState,
    reducers:{
        setUserImage(state,value){
           state.Image = value.payload;
        },
        setcType(state,value){
            state.cType = value.payload;
         },
         setuserdata(state, value) {
            // Create a copy of the user data without the "Favorite" property
            const userDataWithoutFavorite = { ...value.payload };
            delete userDataWithoutFavorite.Favorite;
        
            // Convert the modified user data object to a JSON string
            const userDataString = JSON.stringify(userDataWithoutFavorite);
        
            // Store the JSON string in localStorage
            localStorage.setItem("userdata", userDataString);
        
            // Update the state with the modified user data object
            state.userdata = userDataWithoutFavorite;
        },
        
         setLogin(state,value){
            state.isLogin = value.payload
         },
         setquery(state,value){
            state.query = value.payload
         },
         setsearch(state,value){
            state.search = value.payload
         },
         setSignData(state,value){
            state.SignData = value.payload
         },
         setToken(state,value){

         localStorage.setItem("token",value.payload);
            state.token = value.payload
         }
    }
})

export const {Image,setUserImage,setcType,cType,setuserdata,userdata,setLogin,isLogin,query,setquery,search,setsearch,setSignData,SignData,Token,setToken} = userDataSlice.actions;
export default userDataSlice.reducer;


// export const {setuserdata,userdataform} = SignUpData.actions;
// export default SignUpData.reducer;
