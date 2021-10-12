import {Button, List, Typography} from 'antd' 
import {useSelector,useDispatch} from 'react-redux'
import {selectTasks} from '../../features/task/contentSlice'
import {StarOutlined} from '@ant-design/icons'
import { useCallback } from 'react';
import {createDescription} from '../../utils'
import StarButton from '../Component/StarButton'
import FinishedButton from '../Component/FinishedButton'
import {set_id} from '../../features/details/detailsSlice'

function TaskItems(props) {
    
    const dispatch=useDispatch()

    const tasks=useSelector(selectTasks);

    const showDetails=useCallback((_id)=>{
        console.log('set _id',_id);
        dispatch(set_id(_id));
    })

    const renderItems=(item)=>{
        return (
            <List.Item
                actions={[
                    <StarButton important={item.important} _id={item._id}/>
                ]}
                key={item.uuid}
                style={{borderBottom:'thin solid',color:'#228BE8'}}
                onClick={()=>showDetails(item._id)}
                >
                <FinishedButton finished={item.finished} _id={item._id}/>
                <List.Item.Meta
                    title={<Typography.Title level={5} style={{color:'#228BE8'}}>{item.name}</Typography.Title>}
                    description={createDescription(item,props.listName)}
                    >
                </List.Item.Meta>
            </List.Item>
        )
    }
    return(
        <List
            itemLayout='horizontal'
            dataSource={tasks}
            renderItem={renderItems}
            >
            <div ></div>

        </List>
    )

}

export default TaskItems