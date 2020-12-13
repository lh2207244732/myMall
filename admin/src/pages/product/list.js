import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Breadcrumb, Table, Button, InputNumber } from 'antd';
import { connect } from 'react-redux'
const { Content } = Layout;

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
            handleUpdataOrder
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
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
                render: (order, record) => <Link to={'product/save/' + record._id}>
                    修改
                </Link>

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
                    <Link to='product/save'>
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
    list: state.get('product').get('list'),
    current: state.get('product').get('current'),
    pageSize: state.get('product').get('pageSize'),
    total: state.get('product').get('total'),
    isFetching: state.get('product').get('isFetching')
})

const mapDispatchToProps = (dispatch) => ({
    handlePage: (page) => {
        // dispatch(actionCreator.getPageAction(page))
    },
    handleUpdataOrder: (id, newOrder) => {
        // dispatch(actionCreator.updataOrder(id, newOrder))
    },

})
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)