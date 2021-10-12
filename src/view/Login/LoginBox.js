import { Form, Input, Button, Card,Space} from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import React from 'react';
import { selectIsDrawerVisible, setVisible } from '../../features/drawer/drawerSlice';


function LoginBox(props){

    const dispatch=useDispatch()
    const visible=useSelector(selectIsDrawerVisible)

    const onFinish = () => {
      console.log('Success:');
    };
  
    const onFinishFailed = () => {
      console.log('Failed:');
    };

    const handleSignin=()=>{
        dispatch(setVisible())
        console.log(visible)
    }

    return(
        <Card title="登陆到 ToDo" bordered={true} style={{ width: 300,borderRadius:5,borderWidth:2}}>
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      on
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <Button type='primary' htmlType='button' onClick={handleSignin}>
            Signin
        </Button>
        </Space>
      </Form.Item>
    </Form>
    </Card>
    )
}
export default LoginBox