import React from 'react'
import {StarOutlined,StarFilled} from '@ant-design/icons'
import { Button } from 'antd'
import {useDispatch} from 'react-redux'
import {setImportantStatus} from '../../features/task/contentSlice'
import tryDiapatch from '../../tryDispatch'

function StarButton({important,_id}){
    const dispatch=useDispatch()
    const changeImportantStatus=(event)=>{
        tryDiapatch(dispatch,{_id:_id},setImportantStatus)
        event.stopPropagation()
    }

    return (
    <Button
        icon={important?<StarFilled style={{color:'#228BE8'}} />:<StarOutlined style={{color:'#228BE8'}} />}
        type='text'
        size='large'
        onClick={changeImportantStatus}
        style={{marginRight:10,float:'right'}}
        />
    )
}

export default StarButton