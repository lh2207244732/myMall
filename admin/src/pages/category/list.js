import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Breadcrumb, Table, Switch, Button, Input, InputNumber } from 'antd';
import { connect } from 'react-redux'
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'


class CategoryList extends React.Component {

    componentDidMount() {
        this.props.handlePage(1)
    }

    render() {
        const {
            list,
            current,
            pageSize,
            total,
            handlePage,
            isFetching,
            handleUpdataName,
            handleUpdataMobileName,
            handleUpdataIsShow,
            handleUpdataIsFloor,
            handleUpdataOrder
        } = this.props
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
                width: '20%',
                render: (mobileName, record) => <Input
                    style={{ width: '60%' }}
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
                width: '15%',
                render: (icon) => <img
                    src={icon}
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%'
                    }}
                />

            },
            {
                title: '是否显示',
                dataIndex: 'isShow',
                key: 'isShow',
                width: '15%',
                render: (isShow, record) => <Switch
                    checkedChildren="显示"
                    unCheckedChildren="隐藏"
                    checked={isShow === '1' ? true : false}
                    onChange={
                        checked => {
                            const newIsShow = checked ? '1' : '0'
                            handleUpdataIsShow(record._id, newIsShow)
                        }}
                />
            },
            {
                title: '是否楼层',
                dataIndex: 'isFloor',
                key: 'isFloor',
                width: '10%',
                render: (isFloor, record) => {
                    return record.level == '1' ? <Switch
                        style={{ width: '60%' }}
                        checkedChildren="是"
                        unCheckedChildren="否"
                        checked={isFloor === '1' ? true : false}
                        onChange={
                            checked => {
                                const newIsFloor = checked ? '1' : '0'
                                handleUpdataIsFloor(record._id, newIsFloor)
                            }}
                    /> : null
                }
            },
            {
                title: '排序',
                dataIndex: 'order',
                key: 'order',
                width: '10%',
                render: (order, record) => <InputNumber
                    style={{ width: '80%' }}
                    defaultValue={order}
                    onBlur={(ev) => {
                        if (ev.target.value != order) {
                            handleUpdataOrder(record._id, ev.target.value)
                        }
                    }}
                />
            },
            {
                title: '操作',
                width: '10%',
                render: (order, record) => <Link to={'category/save/' + record._id}>
                    修改
                </Link>

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

                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row-reverse',
                                marginBottom: '20px'
                            }}>
                            <Link to='category/save'>
                                <Button type='primary'>
                                    新增
                                </Button>
                            </Link>
                        </div>
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
    },
    handleUpdataIsShow: (id, newIsShow) => {
        dispatch(actionCreator.updataIsShow(id, newIsShow))
    },
    handleUpdataIsFloor: (id, newIsFloor) => {
        dispatch(actionCreator.updataIsFloor(id, newIsFloor))
    },
    handleUpdataOrder: (id, newOrder) => {
        dispatch(actionCreator.updataOrder(id, newOrder))
    },

})
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)