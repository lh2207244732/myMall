import React from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select } from 'antd';
import { connect } from 'react-redux'

const { Content } = Layout;
const { Option } = Select;

import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/UploadImage'
import { CATEGORY_ICON_UPLOAD } from 'api/config'
import { actionCreator } from './store'

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

    componentDidMount() {
        this.props.handleLevelCategories()
    }

    render() {
        const { handleIcon, iconValdate, handleSave, handleValdate, categories } = this.props
        console.log(categories)
        const options = categories.map(
            category => <Option key={category._id} value={category._id}>
                {category.name}
            </Option>
        )

        return (
            <CustomLayout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
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
                        onFinish={handleSave}
                        onFinishFailed={handleValdate}
                    >
                        <Form.Item name="pid" label="父级分类" rules={[{
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
                            {...iconValdate.toJS()}
                        >
                            <UploadImage
                                getImageUrlList={handleIcon}
                                max={1}
                                action={CATEGORY_ICON_UPLOAD}
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

})

const mapDispatchToProps = (dispatch) => ({
    handleIcon: (icon) => {
        dispatch(actionCreator.setIcon(icon))
    },
    handleSave: (values) => {
        dispatch(actionCreator.getSaveAction(values))
    },
    handleLevelCategories: () => {
        dispatch(actionCreator.getLevelCategoriesAction())
    },
    handleValdate: () => {
        dispatch(actionCreator.getValdateAction())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CategorySave)
