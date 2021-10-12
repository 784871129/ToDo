import { Drawer, Form, Button, Col, Row, Input, message} from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsDrawerVisible, setInvisible} from '../../features/drawer/drawerSlice';
import useAccount from './account'


function SigninDrawer(props){
    let isVisible=useSelector(selectIsDrawerVisible);
    const dispatch = useDispatch();
    const [createAccount,loading,code]=useAccount();

    const onClose = () => {
        dispatch(setInvisible());
        console.log(isVisible)
    };

    const onFinish=async (values)=>{
        await createAccount(values);
    }

    return (
      <>
        <Drawer
          title="Create a new account"
          width={300}
          onClose={onClose}
          visible={isVisible}
          bodyStyle={{ paddingBottom: 10 }}

        >
          <Form layout="vertical" hideRequiredMark onFinish={onFinish} >
            <Row gutter={20}>
              <Col span={18}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" autoComplete='off' disabled={loading} />
                </Form.Item>
              </Col>
              <Col>
              <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: 'Please enter your password' }]}
                  
                >
                  <Input placeholder="Please enter password" autoComplete='off' disabled={loading} />
                </Form.Item>
                <Form.Item>
                    <Button 
                        type='primary'
                        htmlType='submit'
                    >
                        Create
                    </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
}

export default SigninDrawer