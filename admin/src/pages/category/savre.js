import React from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select } from 'antd';
import { connect } from 'react-redux'

const { Content } = Layout;
const { Option } = Select;

import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/UploadImage'
import { CATEGORY_ICON_UPLOAD } from 'api/config'
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

class CategorySave extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.categoryId,
            icon: '',
            iconValdate: {
                help: '',
                validateStatus: ''
            },
        }
        this.formRef = React.createRef()
        this.handleIcon = this.handleIcon.bind(this)

        this.handleFinish = this.handleFinish.bind(this)
        this.handleValdate = this.handleValdate.bind(this)
    }
    async componentDidMount() {
        if (this.state.id) {
            //如果有id则是修改分类，需要请求分类详情，渲染分类页面
            const result = await api.getCategoryDetail({ id: this.state.id })

            if (result.code == '0') {
                const data = result.data
                this.formRef.current.setFieldsValue({
                    pid: data.pid,
                    name: data.name,
                    mobileName: data.mobileName
                })
                //请求成功，设置state中的icon用于显示
                this.setState({
                    icon: data.icon
                })
            } else {
                this.setState({
                    icon: ''
                })
            }

        }
        this.props.handleLevelCategories()
    }
    handleIcon(icon) {
        this.setState({
            icon: icon,
            iconValdate: {
                help: '',
                validateStatus: ''
            },
        })
    }

    handleFinish(values) {
        const { icon, id } = this.state
        this.handleValdate()
        if (icon) {
            values.icon = icon
            values.id = id
            this.props.handleSave(values)
        }
    }
    handleValdate() {
        const { icon } = this.state
        if (!icon) {
            this.setState({

                iconValdate: {
                    help: '请上传手机分类图标',
                    validateStatus: 'error'
                },
            })
        }
    }
    render() {
        const {
            categories,
        } = this.props
        const { iconValdate, icon } = this.state
        let fileList = []
        if (icon) {
            fileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: icon,
            })
        } else {
            fileList = []
        }
        const options = categories.map(
            category => <Option key={category._id} value={category._id}>
                {category.name}
            </Option>
        )

        return (
            <CustomLayout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>分类</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.id ? '编辑分类' : '新增分类'}</Breadcrumb.Item>
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
                        onFinishFailed={this.handleValdate}
                        onFinish={
                            this.handleFinish
                        }
                        ref={this.formRef}
                    >
                        <Form.Item
                            name="pid"
                            label="父级分类"

                            rules={[{
                                required: true,
                                message: '请选择父级分类!'

                            }]}>
                            <Select
                                placeholder="请选择父级分类"
                                onChange={(values) => { console.log(values) }}
                                allowClear
                            >
                                <Option value="0">根分类</Option>
                                {options}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="分类名称"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入分类名称!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="手机分类名称"
                            name="mobileName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机分类名称!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="手机分类图标"
                            required={true}
                            {...iconValdate}
                        >
                            <UploadImage
                                getImageUrlList={this.handleIcon}
                                max={1}
                                action={CATEGORY_ICON_UPLOAD}
                                fileList={fileList}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                添加
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </CustomLayout>
        )
    }
}
const mapStateToProps = (state) => ({

    categories: state.get('category').get('categories'),

})

const mapDispatchToProps = (dispatch) => ({

    handleSave: (values) => {
        dispatch(actionCreator.getSaveAction(values))
    },
    handleLevelCategories: () => {
        dispatch(actionCreator.getLevelCategoriesAction())
    },


})
export default connect(mapStateToProps, mapDispatchToProps)(CategorySave)
