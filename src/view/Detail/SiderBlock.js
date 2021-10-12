import { Button } from 'antd'
import {CarryOutOutlined, ScheduleOutlined, RedoOutlined,CloseOutlined} from '@ant-design/icons'
import React, { useState } from 'react'

function SiderBlock(props) {
    const createIcons=()=>{
        switch(props.type){
            case 'add_toToday':
                return <CarryOutOutlined/>;
            case 'set_duedate':
                return <ScheduleOutlined />;
            case 'set_circular':
                return <RedoOutlined />
            default:
                break;
        }
    }

    return (
        <div style={{
            height:50,
            background:'white',
            textAlign:'left',
            lineHeight:'50px',
            cursor:'default',
            color:props.color
            }} 
            onClick={props.handleClick}
            >
                <span style={{float:'left',marginLeft:20}}>
                    {createIcons()}
                </span>
                <span style={{marginLeft:15}}>
                    {props.text}
                </span>  
                <span style={{float:'right',marginRight:20}}>
                <Button  
                    style={{border:'none'}} 
                    size='small' 
                    icon={<CloseOutlined style={{fontSize:10,color:'gray'}} />} 
                    onClick={props.handleCancel}  />
                </span>
        </div>
    )
}
export default SiderBlock