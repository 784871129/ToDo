function tryDiapatch(dispatch,actions,reducer) {
    console.log('actions',actions);
    const postData=JSON.stringify(actions);
    const header=new Headers({
        'Content-Type':'application/json'
    });
    const HttpRequest={
        method:'POST',
        body:postData,
        headers:header
    }
    switch(reducer.toString()){
        case 'tasks/createNewTask':
            console.log('postdata',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/createTask',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
                result=JSON.parse(result);
                if(result._id){
                    console.log('success create',actions)
                    dispatch(reducer({_id:result._id,_name:actions.name,user_id:'default'}))
                }else{
                    console.log('failed to save')
                }
            })
            break;
        case 'tasks/setFinishedStatus':
            console.log('postdata',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/setFinishedStatus',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
                result=JSON.parse(result);
                if(result._id){
                    console.log('success change',result)
                    dispatch(reducer({_id:result._id,new_id:result.new_id}))
                }else{
                    console.log('failed to change')
                }
            })
            break;
        case 'tasks/setImportantStatus':
            console.log('postdata',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/setImportantStatus',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
                result=JSON.parse(result);
                if(result._id){
                    console.log('success change',actions)
                    dispatch(reducer(result._id))
                }else{
                    console.log('failed to change')
                }
            })
            break;       
        case  'tasks/setSubtasksFinished':
            debugger;
            console.log('postdata',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/setSubtasksFinished',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
                result=JSON.parse(result);
                if(result._id){
                    console.log('success change',actions)
                    dispatch(reducer({_id:result._id,idx:actions.idx}))
                }else{
                    console.log('failed to change')
                }
            })
            break;
        case 'tasks/createSubtask':
            console.log('postdata',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/createSubtask',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
                result=JSON.parse(result);
                if(result._id){
                    console.log('success ',actions)
                    dispatch(reducer({_id:result._id,_name:actions._name}))
                }else{
                    console.log('failed ')
                }
            })
            break;
        case 'tasks/deleteSubtask':
            console.log('deleteSubtask',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/deleteSubtask',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
                result=JSON.parse(result);
                if(result._id){
                    console.log('success ',actions)
                    dispatch(reducer({_id:result._id,idx:actions.idx}))
                }else{
                    console.log('failed ')
                }
            })
            break;
        case 'tasks/updateSubtask':
            console.log('updateSubtask',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/updateSubtask',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
                result=JSON.parse(result);
                if(result._id){
                 console.log('success ',actions)
                    dispatch(reducer({_id:result._id,idx:actions.idx,name:actions.name}))
                }else{
                    console.log('failed ')
                }
            })
            break;
        case 'tasks/updateCircular':
            console.log('postdata',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/updateCircular',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
                result=JSON.parse(result);
                if(result._id){
                    console.log('success ',actions)
                    dispatch(reducer({_id:result._id,circular:actions.circular}))
                }else{
                    console.log('failed ')
                }
            })
            break;        
        case 'tasks/deleteTask':
            console.log('postdata',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/deleteTask',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
                result=JSON.parse(result);
                console.log('del',result);
                if(result.deletedCount>=1){
                    console.log('success ',result)
                    dispatch(reducer(actions._id))
                }else{
                    console.log('failed ')
                }
            })
            break;    
        case 'tasks/addToTodayList':
                    console.log('postdata',postData)
                    fetch('https://qc54nq.fn.thelarkcloud.com/addToTodayList',HttpRequest)
                    .then(response=>response.text())
                    .then(result=>{
                        result=JSON.parse(result);
                        if(result._id){
                            console.log('success ',result)
                            dispatch(reducer(actions._id))
                        }else{
                            console.log('failed ')
                        }
                    })
                    break;
        case 'tasks/removeFromTodayList':
            console.log('postdata',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/removeFromTodayList',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
            result=JSON.parse(result);
            if(result._id){
                console.log('success ',result)
                dispatch(reducer(actions._id))
            }else{
                console.log('failed ')
            }
            })
            break;
        case 'tasks/deleteCircular':
            debugger;
            console.log('postdata',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/deleteCircular',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
            result=JSON.parse(result);
            if(result._id){
                console.log('success ',result)
                dispatch(reducer(actions._id))
            }else{
                console.log('failed ')
            }
            })
            break;
        case 'tasks/deleteDuedate':
            console.log('postdata',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/deleteDuedate',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
            result=JSON.parse(result);
            if(result._id){
                console.log('success ',result)
                dispatch(reducer(actions._id))
            }else{
                console.log('failed ')
            }
            })
            break;
        case 'tasks/updateDuedate':
            console.log('postdata',postData)
            fetch('https://qc54nq.fn.thelarkcloud.com/updateDuedate',HttpRequest)
            .then(response=>response.text())
            .then(result=>{
            result=JSON.parse(result);
            if(result._id){
                console.log('success ',result)
                dispatch(reducer({_id:actions._id,duedate:actions.duedate}))
            }else{
                console.log('failed ')
            }
            })
            break;
        default:

    }
}

export default tryDiapatch