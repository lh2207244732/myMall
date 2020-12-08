import React from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { Content } = Layout;
const { Option } = Select;

import CustomLayout from 'components/custom-layout'

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
            loading: false
        }
    }
    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
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
                        onFinish={(values => { console.log(values) })}
                    >
                        <Form.Item name="fatherCategory" label="父级分类" rules={[{
                            required: true,
                            message: '请选择父级分类!'
                        }]}>
                            <Select
                                placeholder="请选择父级分类"
                                onChange={(values) => { console.log(values) }}
                                allowClear
                            >
                                <Option value="0">根类别</Option>
                                <Option value="female">female</Option>
                                <Option value="other">other</Option>
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
                            name="mobilename"
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
                            name="icon"
                            rules={[
                                {
                                    required: true,
                                    message: '请上传手机分类图标!',
                                },
                            ]}
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={() => { console.log('beforeUpload...') }}
                                onChange={(values) => { console.log(values) }}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>



                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
        </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </CustomLayout>
        )
    }
}

export default CategorySave