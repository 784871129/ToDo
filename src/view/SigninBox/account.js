import React,{useState} from 'react'
import {message} from 'antd'


function useAccount(){
    const [loading,setLoading]=useState(false);
    //const [message,setMessage]=useState('');
    const createAccount=(values)=>{
        setLoading(true);
        const postData=JSON.stringify(values);
        let header=new Headers({
            'Content-Type':'application/json'
        })
        console.log('postdata',postData)
        fetch('https://qc54nq.fn.thelarkcloud.com/createAccount',{
            method:'POST',
            body:postData,
            headers:header
        }).then(response=>{
            return response.text()
        }).then(result=>{
            setLoading(false);
            const ret=JSON.parse(result)
            if(ret.code===-1){
                message.info('User name already existed')
            }else if(ret.code===-2){
                message.info('Create account failed')
            }else if(ret.code===1){
                message.info('Success!')
            }
        })
    }

    const validateAccount=(values)=>{
        const postData=JSON.stringify(values);
        const header =new Headers({
            'Content-Type':'application/json'
        })
        fetch('https://qc54nq.fn.thelarkcloud.com/validateAccount',{
            method:'POST',
            body:postData,
            headers:header
        })
        .then(response=>response.text())
        .then(result=>{
            
        })
    }

    return [createAccount,loading]
}

export default useAccount