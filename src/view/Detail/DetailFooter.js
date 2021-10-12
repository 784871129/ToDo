import { RightOutlined ,DeleteOutlined} from "@ant-design/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { closeDetail } from "../../features/details/detailsSlice";
import { deleteTask } from "../../features/task/contentSlice";
import tryDiapatch from "../../tryDispatch";

function DetailFooter(props) {
    const dispatch=useDispatch()
    const handleCloseDetail=()=>{
        dispatch(closeDetail())
    }
    const handleDeleteTask=()=>{
        tryDiapatch(dispatch,{_id:props._id},deleteTask)
        dispatch(closeDetail())
    }
    return (
        <div style={{   
            height:20,
            background:'000000',
            lineHeight:'20px',
            cursor:'default',
            color:'grey'
            }} 
            >
            <span style={{marginLeft:20}}  >
                <RightOutlined onClick={handleCloseDetail}/>
            </span>
            <span style={{marginRight:25,float:'right'}}>
                <DeleteOutlined onClick={handleDeleteTask} />
            </span>
        </div>
    )
}

export default DetailFooter