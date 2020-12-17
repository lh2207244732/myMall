import React from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import api from 'api'
import { removeUsername, goLogin } from 'util';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 14,
        span: 6,
    },
};

class Pwd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pwdValdate: {
                help: '',
                validateStatus: ''
            },
        }

        this.handleFinish = this.handleFinish.bind(this)
    }
    async handleFinish(values) {
        const { password, repassword } = values
        if (password != repassword) {
            this.setState({
                pwdValdate: {
                    help: '两次密码不一致',
                    validateStatus: 'error'
                }
            })
            return
        } else {
            this.setState({
                pwdValdate: {
                    help: '',
                    validateStatus: ''
                }
            })
            const result = await api.UpdataUserPwd({
                password: password
            })
            if (result.code == 0) {
                message.success('密码修改成功', 1)
                removeUsername()
                goLogin()
            } else {
                message.error('网络错误，密码修改失败', 1)
            }
        }

    }
    render() {
        const { pwdValdate } = this.state
        return (
            <CustomLayout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>用户</Breadcrumb.Item>
                    <Breadcrumb.Item>修改密码</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={
                            this.handleFinish
                        }
                    >
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                                {
                                    pattern: /\w{3,6}$/,
                                    message: '密码是3-6位任意字符'
                                }
                            ]}
                        >
                            <Input.Password
                                placeholder="请输入密码"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="密码确认"
                            name="repassword"
                            {...pwdValdate}
                        >
                            <Input.Password
                                placeholder="请再次输入密码!"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </CustomLayout>
        )
    }
}

export default Pwd
