import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Breadcrumb, Table, Switch, Button, Input } from 'antd';
import { connect } from 'react-redux'
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'
import { formatData } from 'util'

class CategoryList extends React.Component {

    componentDidMount() {
        this.props.handlePage(1)
    }

    render() {
        const { list, current, pageSize, total, handlePage, isFetching, handleUpdataName, handleUpdataMobileName } = this.props
        const dataSource = list
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
                render: (name, record) => <Input
                    style={{ width: '60%' }}
                    defaultValue={name}
                    onBlur={(ev) => {
                        if (ev.target.value != name) {
                            handleUpdataName(record._id, ev.target.value)
                        }
                    }}
                />
            },
            {
                title: '手机分类名称',
                dataIndex: 'mobileName',
                key: 'mobileName',
                render: (mobileName, record) => <Input
                    defaultValue={mobileName}
                    onBlur={(ev) => {
                        if (ev.target.value != mobileName) {
                            handleUpdataMobileName(record._id, ev.target.value)
                        }
                    }}
                />
            },
            {
                title: '手机图标',
                dataIndex: 'icon',
                key: 'icon',

            },
            {
                title: '是否显示',
                dataIndex: 'isShow',
                key: 'isShow',
            },
            {
                title: '是否楼层',
                dataIndex: 'isFloor',
                key: 'isFloor',
            },
            {
                title: '排序',
                dataIndex: 'order',
                key: 'order',
            },
            {
                title: '操作',

            }
        ];

        return (
            <div className='CategoryList'>
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>分类</Breadcrumb.Item>
                        <Breadcrumb.Item>分类列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <Link to='category/save'>
                        <Button type='primary'
                            style={{
                                position: 'absolute',
                                right: '49px',
                                top: '75px'
                            }}
                        >
                            新增
                        </Button>
                    </Link>

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
    list: state.get('category').get('list'),
    current: state.get('category').get('current'),
    pageSize: state.get('category').get('pageSize'),
    total: state.get('category').get('total'),
    isFetching: state.get('category').get('isFetching')
})

const mapDispatchToProps = (dispatch) => ({
    handlePage: (page) => {
        dispatch(actionCreator.getPageAction(page))
    },
    handleUpdataName: (id, newName) => {
        dispatch(actionCreator.updataName(id, newName))
    },
    handleUpdataMobileName: (id, newMobileName) => {
        dispatch(actionCreator.updataMobileName(id, newMobileName))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)