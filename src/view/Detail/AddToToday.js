import React from "react";
import { useDispatch } from "react-redux";
import SiderBlock from './SiderBlock'
import { removeFromTodayList, addToTodayList } from "../../features/task/contentSlice";
import tryDiapatch from "../../tryDispatch";

function AddToToday(props) {
    const dispatch=useDispatch()
    const removeFomToday=(event)=>{
        if(!props.isInToday)return;
        tryDiapatch(dispatch,{_id:props._id},removeFromTodayList)
        event.stopPropagation();
    }
    const addToToday=()=>{
        if(props.isInToday)return;
        tryDiapatch(dispatch,{_id:props._id},addToTodayList)
    }

    const createText=()=>{
        if(props.isInToday){
            return '已添加到我的一天'
        }
        return '添加到我的一天'
    }

    return (
        <SiderBlock  
            type='add_toToday' 
            text={createText()} 
            handleCancel={removeFomToday} 
            handleClick={addToToday}
            color={props.isInToday?'#228BE8':'grey'}
        />       
    )
}

export default AddToToday