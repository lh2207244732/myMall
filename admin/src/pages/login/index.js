import React, { Component } from 'react'
import axios from 'axios'

import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, RocketOutlined } from '@ant-design/icons';

import './index.css'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            captcha: ''
        }
        this.getCaptcha = this.getCaptcha.bind(this)
    }

    onFinish(values) {
        console.log('Received values of form: ', values);
    };

    async getCaptcha() {
        const result = await axios({
            type: 'get',
            url: '/v1/users/captcha'
        })
        if (result.data.code == 0) {
            const captcha = result.data.data
            this.setState({
                captcha
            })
        }
    }

    componentDidMount() {
        this.getCaptcha()
    }

    render() {
        return (
            <div className='Login'>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的密码!',
                            },
                            {
                                pattern: /^[a-zA-Z]\w{2,5}$/,
                                message: '用户名以字母开头，长度为3-6位字符'
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的密码！',
                            },
                            {
                                pattern: /\w{3,6}$/,
                                message: '密码是3-6位任意字符'
                            }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="captcha"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入验证码！',
                                        },
                                        {
                                            pattern: /^[a-z0-9]{4}$/i,
                                            message: '验证码是4位数字字母组合'
                                        }
                                    ]}
                                >
                                    <Input
                                        prefix={<RocketOutlined className="site-form-item-icon" />}
                                        placeholder="请输入验证码..."
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <div onClick={this.getCaptcha} className='captcha' dangerouslySetInnerHTML={{ __html: this.state.captcha }}></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}