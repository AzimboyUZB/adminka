import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { usePostRequest } from '../hooks/request';
import { useNavigate } from 'react-router-dom';
import { loginUrl } from '../helpers/urls';

function LoginPage() {
    const {request, loading} = usePostRequest({ url: loginUrl })
    const navigate = useNavigate()

    const handleOnFinish = async (e) => {
        console.log(e);
        const { response, success } = await request({data: e })
        if (success) {
            if (response.isOk) {
                localStorage.setItem('accessToken', response.accessToken)
                localStorage.setItem('refreshToken', response.refreshToken)
                navigate('/')
        console.log(response);
                
            } else {
                message.warning(response.message)
            }
        }
    }
    return (
        <div className='loginPage-wrapper'>
            <div className='loginForm'>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    onFinish={handleOnFinish}

                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage