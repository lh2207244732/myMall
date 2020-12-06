import React from 'react'

import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
const { Header } = Layout;

import './index.less'
import { getUsername, removeUsername, goLogin } from 'util';
import api from 'api';

class CustomHeader extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }
    //退出登录
    async handleLogout() {
        //向后台发送请求
        await api.logout()
        //删除前台username
        removeUsername()
        //跳转到登录页面
        goLogin()
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={this.handleLogout}><LogoutOutlined /> 退出</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className='CustomHeader'>
                <Layout>
                    <Header className="header">
                        <div className="logo" >Sortmall</div>
                        <div className='logout'>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    {getUsername()} <DownOutlined />
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                </Layout>
            </div>
        )
    }
}
export default CustomHeader