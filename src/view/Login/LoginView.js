import {Row,Col} from 'antd';
import React from 'react';
import LoginBox from './LoginBox'
import SigninDrawer from '../SigninBox/SigninDrawer';

function LoginView(){

  return (
  <Row type='flex'  justify='center' align='middle' style={{minHeight:'100vh'}}>
      <Col>
        <LoginBox></LoginBox>
        <SigninDrawer></SigninDrawer>
      </Col>
  </Row>    
  );
};

export default LoginView
