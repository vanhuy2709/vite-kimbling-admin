import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import './login.css';
import { sendRequest } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

    const res = await sendRequest<IBackendAuth<IAuth>>({
      method: 'post',
      url: 'https://kimtuyen.blog/api/v1/auth/login',
      body: values
    })

    if (res.data) {
      sessionStorage.setItem('user', res.data?.access_token);
      navigate('/admin');
    } else {
      message.error("Username / Password không đúng! Xin mời nhập lại");
    }
  };

  return (
    <div className='login--form'>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h1 className='login--title'>KimBling Admin Dashboard</h1>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>

  )
}

export default LoginPage