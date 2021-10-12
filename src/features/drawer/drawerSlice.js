import {createSlice} from '@reduxjs/toolkit'

const initialState={
    value:false
}
export const drawerSlice=createSlice({
    name:'isDrawerVisible',
    initialState,
    reducers:{
        setInvisible:(state)=>{
            state.value=false;
        },
        setVisible:(state)=>{
            state.value=true;
        }
    }

})
export const selectIsDrawerVisible=state=>state.isDrawerVisible.value

export const {setInvisible,setVisible}=drawerSlice.actions
export default drawerSlice.reducer