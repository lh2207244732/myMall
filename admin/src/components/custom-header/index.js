import React from 'react'

import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
const { Header } = Layout;

import './index.less'
import { getUsername } from '../../util';

class CustomHeader extends React.Component {

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={() => { console.log('点击退出') }}><LogoutOutlined /> 退出</a>
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