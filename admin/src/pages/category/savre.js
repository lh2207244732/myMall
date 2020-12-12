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

        }
        this.formRef = React.createRef()
    }
    async componentDidMount() {
        if (this.state.id) {
            //如果有id则是修改分类，需要请求分类详情，渲染分类页面
            const result = await api.getCategoryDetail({ id: this.state.id })
            console.log(result)
            if (result.code == '0') {
                const data = result.data
                this.formRef.current.setFieldsValue({
                    pid: data.pid,
                    name: data.name,
                    mobileName: data.mobileName
                })
                //请求成功，设置state中的icon用于显示
                this.props.handleIcon(data.icon)
            } else {
                this.props.handleIcon('')
            }

        }
        this.props.handleLevelCategories()
    }

    render() {
        const {
            handleIcon,
            iconValdate,
            handleSave,
            handleValdate,
            categories,
            icon
        } = this.props
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
                        onFinish={(values) => handleSave(values, this.state.id)}
                        onFinishFailed={handleValdate}
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
                            // initialValue={category.name}
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
                            {...iconValdate.toJS()}
                        >
                            <UploadImage
                                getImageUrlList={handleIcon}
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
    iconValdate: state.get('category').get('iconValdate'),
    categories: state.get('category').get('categories'),
    icon: state.get('category').get('icon'),
})

const mapDispatchToProps = (dispatch) => ({
    handleIcon: (icon) => {
        dispatch(actionCreator.setIcon(icon))
    },
    handleSave: (values, id) => {
        dispatch(actionCreator.getSaveAction(values, id))
    },
    handleLevelCategories: () => {
        dispatch(actionCreator.getLevelCategoriesAction())
    },
    handleValdate: () => {
        dispatch(actionCreator.getValdateAction())
    },

})
export default connect(mapStateToProps, mapDispatchToProps)(CategorySave)
