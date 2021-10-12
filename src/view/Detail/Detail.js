import React from 'react'
import SubTasks from './SubTasks'
import AddToToday from "./AddToToday";
import TaskSetting from './TaskSetting'
import { useDispatch,useSelector } from "react-redux";
import { selectUUID} from "../../features/details/detailsSlice";
import { selectTaskDetail } from "../../features/task/contentSlice";
import { Input } from 'antd';
import DetailFooter from './DetailFooter';

function Detail(props) {

    const details=useSelector(selectTaskDetail)
    return (
    <div style={{marginLeft:10}} >
        <div style={{marginBottom:10}} >
            <SubTasks details={details}/>
        </div>
        <div style={{marginBottom:10}} >
           <AddToToday isInToday={details.isInTodayList} _id={details._id} /> 
        </div>
        <div style={{marginBottom:10}}  >
            <TaskSetting duedate={details.duedate} _id={details._id} circular={details.circular} />
        </div>
        <div>
            <DetailFooter onRightSiderCollapse={props.onRightSiderCollapse} _id={details._id} />
        </div>
        
    </div>)
}

export default Detail