import {createSlice} from '@reduxjs/toolkit';

const initialState={
    _id:'616540b6f456760a3bc26f14',
    collapsed:true
}
export const detailsSlice=createSlice({
    name:'details',
    initialState,
    reducers:{
        set_id:(state,actions)=>{
            state._id=actions.payload;
            state.collapsed=false;
        },

        closeDetail:(state)=>{
            state.collapsed=true;
        }
    }
})

export const select_id=(state)=>state.details._id
export const selectCollapsed=(state)=>state.details.collapsed
export const {set_id,closeDetail}=detailsSlice.actions 
export default detailsSlice.reducer