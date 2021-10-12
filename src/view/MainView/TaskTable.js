import {Button, Drawer, Input, Space,Menu,Popover} from 'antd'
import {MoreOutlined,SwapOutlined,PlusOutlined} from '@ant-design/icons'
import {Typography} from 'antd'
import TaskItems from './taskItems'
import { useDispatch ,useSelector} from 'react-redux'
import { useState } from 'react'
import {createNewTask ,selectFilterListName,setSortRule} from '../../features/task/contentSlice'
import tryDiapatch from '../../tryDispatch'
const {Title} = Typography



function TaskTable(props) {
    const dispatch=useDispatch()
    const [input,setInput]=useState('')
    const listname=useSelector(selectFilterListName);
    const {isPreset,listName}=useSelector(state=>{
        return {
            isPreset:state.content.filter.isPreset,
            listName:state.content.filter.listName
        }
    })
    const [SortMenuVisible,setSortMenuVisible]=useState(false)


    const updateNewTask=(event)=>{
        setInput(event.target.value);
    }

    const handleCreate=()=>{
        if(input.length===0)return;
        tryDiapatch(dispatch,{
            name:input,
            isPreset:isPreset,
            listName:listName,
            user_id:'default'
        },createNewTask)
        setInput('')
    }

    const handleClickSortMenu=(event)=>{
        let rule='';
        switch(event.key){
            case '0':
                rule='important'
                break;
            case '1':
                rule='create_date_later_first'
                break;
            case '2':
                rule='create_date_older_first'
                break;
            case '3':
                rule='duedate_later_first'
                break;
            case '4':
                rule='duedate_older_first'
                break;
            default:
                rule='default'
        }
        dispatch(setSortRule(rule))
        setSortMenuVisible(false);
    }

    const handleSortMenuVisibleChange=(visible)=>{
        setSortMenuVisible(visible)
    }

    const SortMenu=(
        <Menu onClick={handleClickSortMenu} >
        <Menu.Item key="0" >
              重要性
        </Menu.Item>
        <Menu.Item key="1">
              最后创建
        </Menu.Item>
        <Menu.Item key='2'>
              最早创建
        </Menu.Item>
        <Menu.Item key='3'>
              最后到期
        </Menu.Item>
        <Menu.Item key='4'>
              最早到期
        </Menu.Item>
      </Menu>
    )
    
    return (
        <>
            <Space style={{marginTop:20,color:'#228BE8'}}>
                <Title level={2} style={{color:'#228BE8',marginRight:15}} >{listname}</Title>
                <MoreOutlined style={{fontSize:20}}/>
                <Popover 
                    title="选择排序方式" 
                    trigger="click" 
                    content={SortMenu} 
                    placement={'bottom'} 
                    onVisibleChange={handleSortMenuVisibleChange}
                    visible={SortMenuVisible}
                >   
                        <SwapOutlined style={{fontSize:18,marginRight:20,float:'right'}} rotate={90}/>
                    
                </Popover>  
            </Space>

                <Input 
                prefix={<PlusOutlined onClick={handleCreate} style={{color:'#228BE8',fontSize:'20px'}} />}
                autoComplete='off'
                bordered={false}
                style={{borderBottom:'thin solid', borderBottomColor:'#228BE8'}}
                onPressEnter={handleCreate}
                onChange={updateNewTask}
                value={input}
                ></Input>
 
            <TaskItems></TaskItems>
                        
        </>
    )
}

export default TaskTable