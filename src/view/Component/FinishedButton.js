import {Button } from 'antd'
import React from 'react'
import {CheckCircleOutlined,CheckCircleFilled} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {setFinishedStatus,setSubtasksFinished} from '../../features/task/contentSlice'
import tryDispatch from '../../tryDispatch'

function FinishedButton(props) {
    const dispatch=useDispatch()
    const handleFinished= (event)=>{
        tryDispatch(dispatch,{_id:props._id},setFinishedStatus)
        event.stopPropagation();
    }

    const handleSubtaskFinished=(event)=>{
        tryDispatch(dispatch,{_id:props._id,idx:props.idx},setSubtasksFinished);
       
    }

    const createButton=()=>{
        if(props.type==='subtask'){
            return (
                <Button type='text' size='small' style={{color:'#228BE8',marginLeft:8}} icon={props.finished?<CheckCircleFilled  />:<CheckCircleOutlined/> } onClick={handleSubtaskFinished} >
                </Button>)
        }else {
            return (
                <Button type='text' size='large' style={{color:'#228BE8',marginLeft:0}} icon={props.finished?<CheckCircleFilled  />:<CheckCircleOutlined/> } onClick={handleFinished} >
                </Button>)
        }
    }

    return (
    <span >
        {createButton()}
    </span>
    )
}

export default FinishedButton