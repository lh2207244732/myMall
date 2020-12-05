import React from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { UserOutlined, UnorderedListOutlined, ProjectOutlined, DownOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';
const { Sider } = Layout;

import './index.less'



class CustomSider extends React.Component {

    render() {
        return (
            <div className='CustomSider'>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        style={{ height: 600, borderRight: 0 }}
                    >
                        <Menu.Item key="1">
                            <NavLink exact={true} to='/'>
                                <HomeOutlined /> 首页
                                    </NavLink>

                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to='/user'>
                                <UserOutlined /> 用户管理
                                        </NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to='/category'>
                                <UnorderedListOutlined /> 分类管理
                                        </NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <ProjectOutlined /> 属性管理
                                </Menu.Item>
                        <Menu.Item key="5">
                            <UserOutlined /> 商品管理
                                </Menu.Item>
                        <Menu.Item key="6">
                            <UserOutlined /> 订单管理
                                </Menu.Item>
                        <Menu.Item key="7">
                            <UserOutlined /> 广告管理
                                </Menu.Item>
                        <Menu.Item key="8">
                            <UserOutlined /> 修改密码
                                </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        )
    }
}
export default CustomSider