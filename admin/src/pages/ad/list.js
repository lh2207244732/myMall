import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Breadcrumb, Table, Switch, Button, InputNumber, Image } from 'antd';
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'


class AdList extends React.Component {

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
            handleUpdataIsShow,
            handleUpdataOrder
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '广告名称',
                dataIndex: 'name',
                width: '20%',
            },
            {
                title: '广告位置',
                dataIndex: 'position',
                width: '20%',
                render: position => position === '1' ? '电脑端首页轮播图' : '移动端首页轮播图'
            },
            {
                title: '广告缩略图',
                dataIndex: 'image',
                width: '15%',
                render: image => <Image
                    width={50}
                    src={image}
                />

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
                title: '是否隐藏',
                dataIndex: 'isShow',
                width: '10%',
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
                title: '操作',
                width: '10%',
                render: (order, record) => <Link to={'ad/save/' + record._id}>
                    修改
                </Link>

            }
        ];

        return (
            <div className='AdList'>
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
                            <Link to='ad/save'>
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
    list: state.get('ad').get('list'),
    current: state.get('ad').get('current'),
    pageSize: state.get('ad').get('pageSize'),
    total: state.get('ad').get('total'),
    isFetching: state.get('ad').get('isFetching')
})

const mapDispatchToProps = (dispatch) => ({
    handlePage: (page) => {
        dispatch(actionCreator.getPageAction(page))
    },
    handleUpdataIsShow: (id, newIsShow) => {
        dispatch(actionCreator.updataIsShow(id, newIsShow))
    },
    handleUpdataOrder: (id, newOrder) => {
        dispatch(actionCreator.updataOrder(id, newOrder))
    },

})
export default connect(mapStateToProps, mapDispatchToProps)(AdList)