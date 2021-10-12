import React, { useState } from 'react'
import SiderBlock from './SiderBlock'
import { getChineseDate,getChineseDay,getChineseMonth } from "../../utils";
import { Popover ,Menu, Button, DatePicker} from "antd";
import moment from "moment";
import { updateDuedate,deleteDuedate,updateCircular,deleteCircular, deleteTask } from "../../features/task/contentSlice";
import { useDispatch } from 'react-redux';
import tryDiapatch from '../../tryDispatch';
function TaskSetting(props) {
    const dispatch=useDispatch();
    const [visible1,setVisible1]=useState(false)
    const [visible2,setVisible2]=useState(false)
    const handleDeleteDuedate=(event)=>{
        tryDiapatch(dispatch,{_id:props._id},deleteDuedate)
        event.stopPropagation()
    }
    const handleDeleteCircular=(event)=>{
        tryDiapatch(dispatch,{_id:props._id},deleteCircular)
        event.stopPropagation()
    }
    const createDuedateText=()=>{
        if(!props.duedate){
            return '选择截止日期'
        }
        const current=new Date();
        const _duedate=new Date(props.duedate)
        const arr=_duedate.toDateString().split(' ');
        if(Math.abs(current.getFullYear()-_duedate.getFullYear())>=1){
            return `${arr[3]}年 ${getChineseMonth(arr[1])}月 ${getChineseDate(arr[2])}日 ${getChineseDay(arr[0])} 到期`
        }
        return `${getChineseMonth(arr[1])}月 ${getChineseDate(arr[2])}日 ${getChineseDay(arr[0])} 到期`
    }


    const createColor=()=>{
        if(!props.duedate)return 'grey';       
        if((Date.now()-new Date(props.duedate))>0){
            return '#CB4543';
        }
        return '#228BE8'
    }

    const handleClickCircular=(event)=>{
        let circular='';
        switch(event.key){
            case '0':
                circular='day'
                break;
            case '1':
                circular='week'
                break;
            case '2':
                circular='month'
                break;
            case '3':
                circular='year'
                break;
            default:
        }
        tryDiapatch(dispatch,{_id:props._id,circular:circular},updateCircular)
        setVisible2(false);
    }

    const createCircularText=()=>{
        switch(props.circular){
            case '':
                return '设置循环方式';
            case 'day':
                return '每天';
            case 'week':
                return '每周';
            case 'month':
                return '每月';
            case 'year':
                return '每年';
            default:
                return ''
        }
    }    

    const handleClickDuetate=(event)=>{
        let temp='';
        let duedate='';
        switch(event.key){
            case '0':
                duedate=new Date().toDateString()
                break;
            case '1':
                temp=new Date();
                temp.setDate(temp.getDate()+1);
                duedate=temp.toDateString();
                break;
            case '2':
                temp=new Date();
                temp.setDate(temp.getDate()+7);
                duedate=temp.toDateString();
                break
            case '3':
                return;
            
            default:
        }
        tryDiapatch(dispatch,{_id:props._id,duedate:duedate},updateDuedate)
        setVisible1(false);
    }

    const handleClickDatePicker=(_,str)=>{
        const duedate=new Date(str).toDateString()
        tryDiapatch(dispatch,{_id:props._id,duedate:duedate},updateDuedate)
        setVisible1(false);
    }   

    const handleVisible1Change=(visible)=>{
        setVisible1(visible);
    }

    const handleVisible2Change=(visible)=>{
        setVisible2(visible);
    }

    const duedatemenu = (
        <Menu onClick={handleClickDuetate} >
          <Menu.Item key="0" >
                今天
          </Menu.Item>
          <Menu.Item key="1">
                明天
          </Menu.Item>
          <Menu.Item key='2'>
                下周
          </Menu.Item>
          <Menu.Item key='3'>
              <DatePicker 
                disabled={false} 
                bordered={false}  
                inputReadOnly={true}
                placeholder='日期' 
                defaultValue={moment(new Date(props.duedate===''?new Date():new Date(props.duedate)).toLocaleDateString(),'YYYY/MM/DD')}
                format={'YYYY/MM/DD'}
                showToday={false}
                onChange={handleClickDatePicker}
                
              />
          </Menu.Item>
        </Menu>
      );

    const circularmenu = (
    <Menu onClick={handleClickCircular} >
        <Menu.Item key="0" >
              每天
        </Menu.Item>
        <Menu.Item key="1">
              每周
        </Menu.Item>
        <Menu.Item key='2'>
              每月
        </Menu.Item>
        <Menu.Item key='3'>
              每年
        </Menu.Item>
      </Menu>)
    return (
        <>
        <Popover 
            title="选择到期时间" 
            trigger="click" 
            content={duedatemenu} 
            placement={"left"} 
            onVisibleChange={handleVisible1Change}
            visible={visible1}
            >
            <div>
                <SiderBlock 
                    type='set_duedate' 
                    text={createDuedateText()} 
                    handleCancel={handleDeleteDuedate} 
                    color={createColor()}
                />
            </div>
        </Popover>
        <Popover 
            title="选择循环方式" 
            trigger="click" 
            content={circularmenu} 
            placement={"left"} 
            onVisibleChange={handleVisible2Change}
            visible={visible2}
        >   
         <div>
            <SiderBlock 
                type='set_circular'    
                text={createCircularText()}
                handleCancel={handleDeleteCircular} 
                color={props.circular?'#228BE8':'grey'}
            />
         </div>
        </Popover>
        </>
    )
}

export default TaskSetting