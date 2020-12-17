import React from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select } from 'antd';
import { connect } from 'react-redux'

const { Content } = Layout;
const { Option } = Select;

import CustomLayout from 'components/custom-layout'
import UploadImage from 'components/UploadImage'
import { AD_IMAGE_UPLOAD } from 'api/config'
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
            id: this.props.match.params.adId,
            image: '',
            imageValdate: {
                help: '',
                validateStatus: ''
            },
        }
        this.formRef = React.createRef()
        this.handleImage = this.handleImage.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
        this.handleValdate = this.handleValdate.bind(this)
    }
    async componentDidMount() {
        if (this.state.id) {
            //如果有id则是修改分类，需要请求分类详情，渲染分类页面
            const result = await api.getAdDetail({ id: this.state.id })
            if (result.code == '0') {
                const data = result.data
                this.formRef.current.setFieldsValue({
                    name: data.name,
                    link: data.link,
                    position: data.position,
                })
                //请求成功，设置state中的image用于显示
                this.setState({
                    image: data.image
                })
            } else {
                this.setState({
                    image: ''
                })
            }

        }
    }
    handleImage(image) {
        this.setState({
            image: image,
            imageValdate: {
                help: '',
                validateStatus: ''
            },
        })
    }

    handleFinish(values) {
        const { image, id } = this.state
        this.handleValdate()
        if (image) {
            values.image = image
            values.id = id
            this.props.handleSave(values)
        }
    }
    handleValdate() {
        const { image } = this.state
        if (!image) {
            this.setState({
                imageValdate: {
                    help: '请上传广告图片',
                    validateStatus: 'error'
                },
            })
        }
    }
    render() {

        const { imageValdate, image } = this.state
        let fileList = []
        if (image) {
            fileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: image,
            })
        } else {
            fileList = []
        }

        return (
            <CustomLayout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>广告</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.id ? '编辑广告' : '新增广告'}</Breadcrumb.Item>
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
                            label="广告名称"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入广告名称!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="广告地址"
                            name="link"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入广告地址!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="position"
                            label="广告位置"

                            rules={[{
                                required: true,
                                message: '请选择广告地址!'

                            }]}>
                            <Select
                                placeholder="请选择父级分类"
                                onChange={(values) => { console.log(values) }}
                                allowClear
                            >
                                <Option value="1">电脑端首页轮播图</Option>
                                <Option value="0">移动端首页轮播图</Option>

                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="广告图片"
                            required={true}
                            {...imageValdate}
                        >
                            <UploadImage
                                getImageUrlList={this.handleImage}
                                max={1}
                                action={AD_IMAGE_UPLOAD}
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
