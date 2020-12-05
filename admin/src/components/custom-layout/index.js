import React from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Dropdown, Row, Col, Card } from 'antd';
import { UserOutlined, UnorderedListOutlined, ProjectOutlined, DownOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';


import './index.less'
import { getUsername } from 'util';
import CustomHeader from '../custom-header'
import CustomSider from 'components/custom-sider'

class CustomLayout extends React.Component {

    render() {
        return (
            <div className='CustomLayout'>
                <Layout>
                    <CustomHeader />
                    <Layout>
                        <CustomSider />
                        <Layout style={{ padding: '0 24px 24px' }}>
                            {this.props.children}
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
export default CustomLayout