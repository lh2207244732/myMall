import React from 'react'
import { Layout, Breadcrumb, Form, Input, Button } from 'antd';
import { connect } from 'react-redux'
const { Content } = Layout;


import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'
import api from 'api'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 14,
        span: 6,
    },
};

class AttrSave extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.attrId,

        }
        this.formRef = React.createRef()
    }
    async componentDidMount() {
        if (this.state.id) {
            //如果有id则是修改属性，需要请求属性详情，渲染分类页面
            const result = await api.getAttrDetail({ id: this.state.id })
            console.log(result)
            if (result.code == '0') {
                const data = result.data
                this.formRef.current.setFieldsValue({
                    name: data.name,
                    key: data.key,
                    value: data.value
                })
            }

        }
    }

    render() {
        const {
            handleSave,
        } = this.props
        return (
            <CustomLayout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>属性</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.id ? '编辑属性' : '新增属性'}</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={(values) => handleSave(values, this.state.id)}
                        onFinishFailed={(value) => console.log(value)}
                        ref={this.formRef}
                    >

                        <Form.Item
                            label="属性名称"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入属性名称!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="属性键"
                            name="key"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入属性键名称!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="属性值"
                            name="value"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入属性值，以逗号隔开!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </CustomLayout>
        )
    }
}
const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    handleSave: (values, id) => {
        dispatch(actionCreator.getSaveAction(values, id))
    },


})
export default connect(mapStateToProps, mapDispatchToProps)(AttrSave)
