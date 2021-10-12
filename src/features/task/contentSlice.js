import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import {v4 as uuidv4} from 'uuid'

const EMPTY_TASK={
            user_id:'',
            _id:'',
            name:'',
            important:false,
            finished:false,          
            duedate:'Tue Oct 05 2021',
            createDate:'Tue Oct 05 2021',
            circular:'week',           
            additionInfo:'',
            appendix:'',
            isInTodayList:true,
            list:'我的一天',
            tags:[],
            circularDays:[],
            subtasks:['study'],
            subtasksfinished:[true],
}

const initialState={
    tasks:[],
    filter:{
        isPreset:true,
        listName:'我的一天',
        sortBy:'default'
    }
}


const copyTask=(task,_id)=>{
    const newTask={
        user_id:task.user_id,
        _id:_id,
        name:task.name,
        important:task.important,
        finished:false,
        isInTodayList:task.isInTodayList,
        list:task.list,
        duedate:task.duedate,
        createDate:task.createDate,
        circular:task.circular,
        appendix:task.appendix,
        additionInfo:task.additionInfo,
        tags:[...task.tags],
        circularDays:[...task.circularDays],
        subtasks:[...task.subtasks],
        subtasksfinished:[...task.subtasksfinished]
    }
    return newTask;
}

const createCircularTask=(task,_id)=>{
    const newTask=copyTask(task,_id);//新建下一个循环任务
    const currentDate=new Date(task.duedate); 
    switch (task.circular){
        case 'day':
            currentDate.setDate(currentDate.getDate()+1);
            break;
        case 'week':
            currentDate.setDate(currentDate.getDate()+7);
            break;
        case 'month':
            currentDate.setMonth(currentDate.getMonth()+1);
            break;
        case 'year':
            currentDate.setFullYear(currentDate.getFullYear()+1);
            break;
        default:
            break;
    }
    newTask.finished=false;
    newTask.duedate=currentDate.toDateString();
    return newTask;
}

const sortTasks=(tasks,rule)=>{
    switch(rule){
        case 'default':
            return tasks;
        case 'important':
            return tasks.sort((next,prev)=>{
                if(prev.important){
                    return 1;
                }else{
                    if(next.important){
                        return -1;
                    }
                }
            })
        case 'create_date_older_first':
            return tasks.sort((next,prev)=>{
                if(new Date(next.createDate)<new Date(prev.createDate)){
                    return -1;
                }else return 1
            })

        case 'create_date_later_first':
            return tasks.sort((next,prev)=>{
                if(new Date(next.createDate)<new Date(prev.createDate)){
                    return 1;
                }else return -1
            })
        case 'duedate_later_first':
            return tasks.sort((next,prev)=>{
                if(new Date(next.duedate)<new Date(prev.duedate)){
                    return -1;
                }else return 1
            })
        case 'duedate_older_first':
            return tasks.sort((next,prev)=>{
                if(new Date(next.dueDate)<new Date(prev.dueDate)){
                    return 1;
                }else return -1
            })     
        default:
            return tasks
    }
}



export const contentSlice=createSlice({
    name:'tasks',
    initialState,
    reducers:{
        getTasks:(state,actions)=>{
            state.tasks=actions.payload;
        },
        setFinishedStatus:(state,actions)=>{
            state.tasks.map(item=>{
                if(item._id!==actions.payload._id)return;
                if(item.circular){
                    state.tasks.push(createCircularTask(item,actions.payload.new_id))
                    item.circular=undefined;                                
                }
                item.finished=!item.finished;
            })
        },
        setImportantStatus:(state,actions)=>{
            state.tasks.map(item=>{
                if(item._id!==actions.payload)return;
                item.important=!item.important
            })
        },
        createNewTask:(state,actions)=>{
            const newTask={
                user_id:'default',
                _id:actions.payload._id,
                name:actions.payload._name,
                important:false,
                finished:false,          
                duedate:'',
                createDate:new Date().toDateString() ,
                circular:'',           
                additionInfo:'',
                appendix:'',
                tags:[],
                circularDays:[],
                subtasks:[],
                subtasksfinished:[],
            }
            if(state.filter.isPreset){
                if(state.filter.listName==='我的一天'){
                    newTask.isInTodayList=true;
                }
                if(state.filter.listName==='重要'){
                    newTask.important=true;
                }
            }else {
                newTask.list=state.filter.listName;
            }
            state.tasks.push(newTask);
        
        },

        deleteTask:(state,actions)=>{
            state.tasks=state.tasks.filter(item=>item._id!==actions.payload)
        },

        createSubtask:(state,actions)=>{
            state.tasks.map(item=>{
                if(item._id!==actions.payload._id)return;
                item.subtasks.push(actions.payload._name);
                item.subtasksfinished.push(false);
            })
        },

        switchList:(state,actions)=>{
            const {isPreset,listName}=actions.payload;
            state.filter.isPreset=isPreset;
            state.filter.listName=listName
        },

        updateSubtask:(state,actions)=>{
            state.tasks.map(item=>{
                if(item._id!==actions.payload._id)return;
                item.subtasks[actions.payload.idx]=actions.payload.name;
            })
        },

        deleteSubtask:(state,actions)=>{
            state.tasks.map(item=>{
                if(item._id!==actions.payload._id)return;
                item.subtasks=item.subtasks.filter((_,idx)=>idx!==actions.payload.idx);
                item.subtasksfinished=item.subtasksfinished.filter((_,idx)=>idx!==actions.payload.idx);
            })
        },

        setSubtasksFinished:(state,actions)=>{
            state.tasks.map(item=>{
                if(item._id!==actions.payload._id)return;
                item.subtasksfinished[actions.payload.idx]=!item.subtasksfinished[actions.payload.idx]
            })
        },

        removeFromTodayList:(state,actions)=>{
            state.tasks.map(item=>{
                if(item._id!==actions.payload)return;
                item.isInTodayList=false;
            })
        },

        addToTodayList:(state,actions)=>{
            state.tasks.map(item=>{
                if(item._id!==actions.payload)return;
                item.isInTodayList=true;
            })
        },

        updateDuedate:(state,actions)=>{
            state.tasks.map(item=>{
                if(item._id!==actions.payload._id)return;
                item.duedate=actions.payload.duedate;
            })
        },

        deleteDuedate:(state,actions)=>{
            state.tasks.map(item=>{
                if(item._id!==actions.payload)return;
                item.duedate='';
            }) 
        },

        updateCircular:(state,actions)=>{
            state.tasks.map(item=>{
                if(item._id!==actions.payload._id)return;
                item.circular=actions.payload.circular;
            }) 
        },

        deleteCircular:(state,actions)=>{
            state.tasks.map(item=>{
                if(item._id!==actions.payload)return;
                item.circular='';
            }) 
        },

        setSortRule:(state,actions)=>{
            state.filter.sortBy=actions.payload;
        }

   }
})


export const selectTasks=(state)=>{//list可以换成filter中的listname

    let results;
    if(state.content.filter.isPreset){
        if(state.content.filter.listName==='我的一天'){
            results=state.content.tasks.filter(task=>task.isInTodayList) 
        }
        else if(state.content.filter.listName==='重要'){
            results=state.content.tasks.filter(task=>task.important)
        }
    }else {
        results=state.content.tasks.filter(task=>task.list===state.filter.listName)
    }
    return sortTasks(results,state.content.filter.sortBy)
}

export const selectFilterListName=(state)=>{
    return state.content.filter.listName;
}

export const selectTaskDetail=state=>{
    return state.content.tasks.find(item=>state.details._id===item._id)||EMPTY_TASK
}

export const {
    setImportantStatus,
    createNewTask,
    switchList,
    setFinishedStatus,
    setSubtasksFinished,
    updateSubtask,
    deleteSubtask,
    createSubtask,
    removeFromTodayList,
    addToTodayList,
    updateDuedate,
    deleteDuedate,
    updateCircular,
    deleteCircular,
    setSortRule,
    deleteTask,
    getTasks
}=contentSlice.actions
export default contentSlice.reducer