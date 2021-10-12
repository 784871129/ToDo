import React, { useCallback } from 'react'
import {Input} from 'antd'
const {Search} = Input;

function SearchBar(){

    const onSearch=useCallback(()=>{

    },[])
    return (
        <Search 
            placeholder="input search text" 
            onSearch={onSearch} 
            enterButton 
            style={{margin:15}} />
    )
}

export default SearchBar