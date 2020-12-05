import React from 'react'
import { Layout, Menu, Breadcrumb, Dropdown, Row, Col, Card } from 'antd';
import { UserOutlined, UnorderedListOutlined, ProjectOutlined, DownOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;

import CustomLayout from 'components/custom-layout'

class Home extends React.Component {
    render() {
        return (
            <CustomLayout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <Row>
                        <Col span={8}>
                            <Card title="用户数" bordered={false} style={{ width: 300 }}>
                                <p>100</p>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="商品数" bordered={false} style={{ width: 300 }}>
                                <p>100</p>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="订单数" bordered={false} style={{ width: 300 }}>
                                <p>100</p>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </CustomLayout>
        )
    }
}
export default Home