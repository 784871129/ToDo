import { List ,Typography ,Card, Input, Space, Divider, Button, Popover} from "antd";
import React, { useCallback, useRef } from "react";
import StarButton from "../Component/StarButton";
import FinishedButton from "../Component/FinishedButton";
import { useSelector ,useDispatch} from "react-redux";
import { deleteSubtask, selectTaskDetail ,updateSubtask, createSubtask} from "../../features/task/contentSlice";
import { createSubtasksArray } from "../../utils";
import {v4 as uuidv4} from 'uuid';
import { CloseOutlined, PlusOutlined} from "@ant-design/icons";
import tryDiapatch from "../../tryDispatch";


function SubTasks(props) {
    const {details} = props
    const dispatch=useDispatch()
    const inputRef=useRef();

    const handleOnBlur=useCallback((e)=>{debugger;
        tryDiapatch(dispatch,{_id:details._id,idx:e.target.id,name:e.target.defaultValue},updateSubtask)
    },[])

    const handleCreateSubstask=(event)=>{
        if(event.target.defaultValue==='')return;
        tryDiapatch(dispatch,{_id:details._id,_name:event.target.defaultValue},createSubtask)
        inputRef.current.state.value='';
    }

    const renderSubTasks=(item)=>{
        const handleDeleteSubtask=(e)=>{
            tryDiapatch(dispatch,{_id:details._id,idx:item.id},deleteSubtask)
        }
        return (
            <List.Item
                style={{borderBottom:'thin solid',color:'#228BE8',height:40}}
                key={uuidv4()}
                >
                <FinishedButton finished={item.finished} idx={item.id} _id={details._id} type='subtask' />
                <Input
                    suffix={
                        <Button  style={{border:'none'}} size='small' icon={<CloseOutlined style={{fontSize:10,color:'gray'}} />} onClick={handleDeleteSubtask}  />}
                    defaultValue={item.name}
                    bordered={false}
                    id={item.id}
                    onBlur={handleOnBlur}
                />
            </List.Item>
        )
    }

     return (
         <div style={{background:'white',padding:10}} >
            <span style={{color:'#228BE8'}}>
                <FinishedButton uuid={details.uuid} finished={details.finished} />
                {details.name}
                <StarButton important={details.important} _id={details._id} />
            </span>
            <List   
            itemLayout='horizontal'
            dataSource={createSubtasksArray(details.subtasks,details.subtasksfinished)}
            renderItem={renderSubTasks}
            >
            <Input
                prefix={
                    <Popover content='新建子任务' >  
                        <PlusOutlined style={{color:'#228BE8'}} />
                    </Popover>  }
                autoComplete='off'
                bordered={false}
                style={{borderBottom:'thin solid', borderBottomColor:'#228BE8',marginTop:5,borderBottomStyle:'dashed'}}
                onBlur={handleCreateSubstask}
                key={details.uuid}
                ref={inputRef}
                placeholder='添加子任务'
                />
            </List>
        </div>
        
        
     )
}

export default SubTasks