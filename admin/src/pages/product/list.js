import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Breadcrumb, Table, Button, InputNumber, Switch, Divider, Input } from 'antd';
import { connect } from 'react-redux'
const { Content } = Layout;
const { Search } = Input;

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'


class ProductList extends React.Component {

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
            handleUpdataStatus,
            handleUpdataIsHot,
            handleUpdataOrder,
            keyword
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                // key: 'name',
                ellipsis: true,
                render: (name) => {
                    if (keyword) {
                        //表示搜索到字段,高亮处理
                        const reg = new RegExp('(' + keyword + ')', 'ig')
                        const html = name.replace(reg, '<b style="color:red">$1</b>')
                        return <span dangerouslySetInnerHTML={{ __html: html }} ></span>
                    } else {
                        return name
                    }
                }
            },
            {
                title: '是否显示在首页',
                dataIndex: 'isShow',

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
                title: '上架/下架',
                dataIndex: 'status',
                width: '15%',
                render: (status, record) => <Switch
                    checkedChildren="上架"
                    unCheckedChildren="下架"
                    checked={status === '1' ? true : false}
                    onChange={
                        checked => {
                            const newStatus = checked ? '1' : '0'
                            handleUpdataStatus(record._id, newStatus)
                        }}
                />
            },
            {
                title: '是否热门',
                dataIndex: 'isHot',
                key: 'isHot',
                width: '15%',
                render: (isHot, record) => <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    checked={isHot === '1' ? true : false}
                    onChange={
                        checked => {
                            const newIsHot = checked ? '1' : '0'
                            handleUpdataIsHot(record._id, newIsHot)
                        }}
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
                title: '操作',
                width: '15%',
                render: (order, record) =>
                    <div>
                        <Link to={'product/save/' + record._id}>
                            修改
                        </Link>
                        <Divider
                            type="vertical"
                        />
                        <Link to={'product/detail/' + record._id}>
                            查看
                        </Link>
                    </div>


            }
        ];

        return (
            <div className='ProductList'>
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品</Breadcrumb.Item>
                        <Breadcrumb.Item>商品列表</Breadcrumb.Item>
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
                                justifyContent: 'space-between',
                                marginBottom: '20px'
                            }}>
                            <Search
                                placeholder="请输入要搜索的关键字"
                                onSearch={(value) => { handlePage(1, value) }}
                                style={{
                                    width: '400px'
                                }}
                                enterButton
                            />
                            <Link to='product/save'>
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
                                    handlePage(pagination.current, keyword)
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
    list: state.get('product').get('list'),
    current: state.get('product').get('current'),
    pageSize: state.get('product').get('pageSize'),
    total: state.get('product').get('total'),
    isFetching: state.get('product').get('isFetching'),
    keyword: state.get('product').get('keyword')
})

const mapDispatchToProps = (dispatch) => ({
    handlePage: (page, keyword) => {
        dispatch(actionCreator.getPageAction(page, keyword))
    },
    handleUpdataIsShow: (id, newIsShow) => {
        dispatch(actionCreator.updataProductsIsShowAction(id, newIsShow))
    },
    handleUpdataStatus: (id, newStatus) => {
        dispatch(actionCreator.updataProductsStatusAction(id, newStatus))
    },
    handleUpdataIsHot: (id, newIsHot) => {
        dispatch(actionCreator.handleUpdataProductsIsHot(id, newIsHot))
    },
    handleUpdataOrder: (id, newOrder) => {
        dispatch(actionCreator.updataProductsOrderAction(id, newOrder))
    },

})
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)