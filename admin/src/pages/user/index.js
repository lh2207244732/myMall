import React from 'react'
import { Layout, Breadcrumb, Table, Switch } from 'antd';
import { connect } from 'react-redux'
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'
import { formatData } from 'util'

class User extends React.Component {

    componentDidMount() {
        this.props.handlePage(1)
    }

    render() {
        const { list, current, pageSize, total, handlePage, isFetching, handleUpdataUserIsActive } = this.props
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
                render: (isActive, record) => <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={isActive === '1' ? true : false}
                    onChange={
                        checked => {
                            const newActive = checked ? '1' : '0'
                            handleUpdataUserIsActive(record._id, newActive)
                        }}
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
                            pagination={
                                {
                                    current: current,
                                    pageSize: pageSize,
                                    total: total,
                                    showSizeChanger: false
                                }
                            }
                            loading={
                                {
                                    spinning: isFetching,
                                    tip: '您的请求正在加载中...'
                                }
                            }
                            onChange={
                                (pagination) => {
                                    handlePage(pagination.current)
                                }
                            }
                        />
                    </Content>
                </CustomLayout>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    list: state.get('user').get('list'),
    current: state.get('user').get('current'),
    pageSize: state.get('user').get('pageSize'),
    total: state.get('user').get('total'),
    isFetching: state.get('user').get('isFetching')
})

const mapDispatchToProps = (dispatch) => ({
    handlePage: (page) => {
        dispatch(actionCreator.getPageAction(page))
    },
    handleUpdataUserIsActive: (id, newActive) => {
        dispatch(actionCreator.updataUserIsActicve(id, newActive))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(User)