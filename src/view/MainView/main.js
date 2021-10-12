import { Button, Space } from 'antd'
import Layout, { Content, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import React, { useEffect, useState } from 'react'
import SearchBar from './searchBar'
import TaskList from './taskList'
import TaskTable from './TaskTable'
import Detail from '../Detail/Detail'
import {selectCollapsed} from '../../features/details/detailsSlice'
import { useDispatch, useSelector } from 'react-redux'
import {getTasks} from '../../features/task/contentSlice'

function Main(){
    const [leftSiderCollapsed,setLeftSiderCollapsed]=useState(false)
    const detail_collapsed=useSelector(selectCollapsed)
    const dispatch=useDispatch()
    useEffect(()=>{
        const postData=JSON.stringify({user_id:'default'});
        const header=new Headers({
            'Content-Type':'application/json'
        });
        const HttpRequest={
            method:'POST',
            body:postData,
            headers:header
        }
        fetch('https://qc54nq.fn.thelarkcloud.com/getTasks',HttpRequest)
        .then(response=>response.text())
        .then(result=>{
            dispatch(getTasks(JSON.parse(result)))
        })
    },[])
    const onLeftSiderCollapse=()=>{
        setLeftSiderCollapsed(!leftSiderCollapsed)
    }

    return (
    <Layout>
        <Header style={{background:'white',}}>
            <Space>
                ToDo
                <SearchBar></SearchBar>
            </Space>
        </Header>
        <Layout style={{marginTop:10}} >
            <Sider 
                theme='light' 
                collapsible 
                collapsed={leftSiderCollapsed} 
                onCollapse={onLeftSiderCollapse} 
            >
                <TaskList inlineCollapsed={leftSiderCollapsed}>
                </TaskList>
            </Sider>
            <Content style={{padding:'0 20px',backgroundColor:'white'}}>
                <TaskTable name='我的一天'></TaskTable>
            </Content>
            <Sider 
                collapsible 
                collapsed={detail_collapsed} 
                style={{marginLeft:0,background:'000000'}}
                collapsedWidth={0}
                width={300}
            >
                <Detail/>               
            </Sider>
        </Layout>
    </Layout>)
}

export default Main