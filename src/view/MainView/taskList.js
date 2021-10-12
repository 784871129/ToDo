import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import Sider from 'antd/lib/layout/Sider';
import Grouplist from './groupList';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useDispatch } from 'react-redux';
import {switchList} from '../../features/task/contentSlice'

function TaskList({inlineCollapsed}){
    const [status,setStatus]=useState(false);
    const dispatch=useDispatch()
    const createListGroup=()=>{

        return (
            <SubMenu></SubMenu>
        )
    }

    const handleClick=(e)=>{
      if(e.key==='我的一天'){
        dispatch(switchList({
          isPreset:true,
          listName:'我的一天'
        }));
      }else if(e.key==='重要'){
        dispatch(switchList({
          isPreset:true,
          listName:'重要'
        }));
      }
    }

    return(
        <Menu
          defaultSelectedKeys={['我的一天']}
          mode="inline"
          theme="light"
          inlineCollapsed={inlineCollapsed}
          style={{marginBottom:50}}
        >
          <Menu.Item key="我的一天" icon={<PieChartOutlined title='我的一天'/>} onClick={handleClick}>
            我的一天
          </Menu.Item>
          <Menu.Item key="重要" icon={<DesktopOutlined title='重要' />} onClick={handleClick} >
            重要
          </Menu.Item>
          <Menu.Item key="计划内" icon={<ContainerOutlined title='计划内' />}onClick={handleClick}>
            计划内
          </Menu.Item>
          <Menu.Item key="任务" icon={<ContainerOutlined title='‘任务' />}  onClick={handleClick} style={{marginBottom:100}}>
            任务
          </Menu.Item>
            {createListGroup()}
         </Menu>
    )
}

export default TaskList