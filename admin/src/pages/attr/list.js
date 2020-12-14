import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Breadcrumb, Table, Button, InputNumber } from 'antd';
import { connect } from 'react-redux'
const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'


class AttrList extends React.Component {

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
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '属性键',
                dataIndex: 'key',
                key: 'key',
            },
            {
                title: '属性值',
                dataIndex: 'value',
                key: 'value',
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
                render: (order, record) => <Link to={'attr/save/' + record._id}>
                    修改
                </Link>

            }
        ];

        return (
            <div className='AttrList'>
                <CustomLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>属性</Breadcrumb.Item>
                        <Breadcrumb.Item>属性列表</Breadcrumb.Item>
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
                            <Link to='attr/save'>
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
    list: state.get('attr').get('list'),
    current: state.get('attr').get('current'),
    pageSize: state.get('attr').get('pageSize'),
    total: state.get('attr').get('total'),
    isFetching: state.get('attr').get('isFetching')
})

const mapDispatchToProps = (dispatch) => ({
    handlePage: (page) => {
        dispatch(actionCreator.getPageAction(page))
    },
    handleUpdataOrder: (id, newOrder) => {
        dispatch(actionCreator.updataOrder(id, newOrder))
    },

})
export default connect(mapStateToProps, mapDispatchToProps)(AttrList)