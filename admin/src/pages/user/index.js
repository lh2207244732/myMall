import React from 'react'
import { Layout, Breadcrumb, Table, Switch } from 'antd';
import { connect } from 'react-redux'
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'
import { formatData } from 'util'

class User extends React.Component {

    componentDidMount() {
        this.props.handlePage()
    }

    render() {
        /*
        const dataSource = [
            {
                key: '1',
                username: '吴彦祖',
                isAdmin: '是',
                isActive: '是',
                email: '2207244732@qq.com',
                phone: '19139319008',
                wxopenid: 'wxid1234',
                createAt: '2020-12-6'

            }
        ];
        */
        const { list } = this.props
        const dataSource = list
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '是否管理员',
                dataIndex: 'isAdmin',
                key: 'isAdmin',
                render: isAdmin => isAdmin ? '是' : '否'
            },
            {
                title: '是否有效用户',
                dataIndex: 'isActive',
                key: 'isActive',
                render: isActive => <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={isActive === '1' ? true : false}
                />
            },
            {
                title: 'email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '手机',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '微信openid',
                dataIndex: 'wxopenid',
                key: 'wxopenid',
            },
            {
                title: '注册时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: createdAt => formatData(createdAt)
            }
        ];

        return (
            <div className='User'>
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>用户</Breadcrumb.Item>
                        <Breadcrumb.Item>用户列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Table
                            rowKey='_id'
                            dataSource={dataSource}
                            columns={columns}
                        />;
                </Content>
                </CustomLayout>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    list: state.get('user').get('list')
})

const mapDispatchToProps = (dispatch) => ({
    handlePage: () => {
        dispatch(actionCreator.getPageAction())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(User)