import React from 'react'
import { Layout, Breadcrumb, Form, Input, Button, Select, InputNumber, Transfer } from 'antd';
import { connect } from 'react-redux'
const { Content } = Layout;
const { Option } = Select;


import CustomLayout from 'components/custom-layout'
import { actionCreator } from './store'
import api from 'api'
import UploadImage from 'components/UploadImage'
import { PRODUCT_IMAGE_UPLOAD } from 'api/config'

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

class ProductSave extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.productId,
            targetKeys: [],
            selectedKeys: [],
            mainImage: '',
            mainImageValdate: {
                help: '',
                validateStatus: ''
            },
            images: '',
            imagesValdate: {
                help: '',
                validateStatus: ''
            },

        }
        this.formRef = React.createRef()
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleMainImage = this.handleMainImage.bind(this)
        this.handleImages = this.handleImages.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
        this.handleValdate = this.handleValdate.bind(this)
    }

    handleChange(nextTargetKeys, direction, moveKeys) {
        this.setState({ targetKeys: nextTargetKeys });
    };

    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    };
    handleMainImage(mainImage) {
        this.setState({
            mainImage: mainImage,
            mainImageValdate: {
                help: '',
                validateStatus: ''
            },
        })
    }
    handleImages(images) {
        this.setState({
            images: images,
            imagesValdate: {
                help: '',
                validateStatus: ''
            },
        })
    }
    handleFinish(values) {
        const { targetKeys, id, mainImage, images } = this.state
        if (targetKeys.length > 0) {
            values.attrs = targetKeys.join(',')
        }
        this.handleValdate()
        if (mainImage && images) {
            values.mainImage = mainImage
            values.images = images
            this.props.handleSave(values, id)
        }

    }
    handleValdate() {
        const { mainImage, images } = this.state
        if (!mainImage) {
            this.setState({
                mainImageValdate: {
                    help: '请上传封面图片',
                    validateStatus: 'error'
                },
            })
        }
        if (!images) {
            this.setState({
                imagesValdate: {
                    help: '请上传商品图片',
                    validateStatus: 'error'
                },
            })
        }
    }
    async componentDidMount() {
        //请求分类数据
        this.props.handleLevelCategories()
        //请求所有的属性
        this.props.handleAllAttrs()

        if (this.state.id) {
            //如果有id则是修改属性，需要请求属性详情，渲染分类页面
            const result = await api.getProductDetail({ id: this.state.id })
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
            categories,
            allAttrs,

        } = this.props
        const {
            targetKeys,
            selectedKeys,
            mainImageValdate,
            imagesValdate,
        } = this.state
        const options = categories.map(
            category => <Option
                key={category._id}
                value={category._id}>
                {category.name}
            </Option>
        )
        const dataSource = allAttrs.map(attr => ({ key: attr._id, title: attr.name }))

        return (
            <CustomLayout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>属性</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.id ? '编辑商品' : '新增商品'}</Breadcrumb.Item>
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
                            price: '0',
                            stock: '0',
                            payNums: '0'
                        }}
                        ref={this.formRef}
                        onFinishFailed={this.handleValdate}
                        onFinish={
                            this.handleFinish
                        }
                    >
                        <Form.Item
                            name="category"
                            label="商品分类"
                            rules={[{
                                required: true,
                                message: '请选择商品分类!'

                            }]}>
                            <Select
                                placeholder="请选择商品分类"
                                allowClear
                            >
                                {options}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="商品名称"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商品名称!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="商品描述"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商品描述!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="商品价格"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商品价格',
                                },
                            ]}
                        >
                            <InputNumber
                                min={0}
                            />
                        </Form.Item>
                        <Form.Item
                            label="商品库存"
                            name="stock"
                            rules={[
                                {
                                    message: '请输入商品库存数字',
                                },
                            ]}
                        >
                            <InputNumber
                                min={0}
                            />
                        </Form.Item>
                        <Form.Item
                            label="支付人数"
                            name="payNums"
                        >
                            <InputNumber
                                min={0}
                            />
                        </Form.Item>
                        <Form.Item
                            label="商品属性"
                            name="attrs"
                        >
                            <Transfer
                                dataSource={dataSource}
                                titles={['未选属性', '已选属性']}
                                targetKeys={targetKeys}
                                selectedKeys={selectedKeys}
                                onChange={this.handleChange}
                                onSelectChange={this.handleSelectChange}
                                render={item => item.title}
                                style={{ marginBottom: 16 }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="封面图片"
                            required={true}
                            {...mainImageValdate}
                        >
                            <UploadImage
                                max={1}
                                action={PRODUCT_IMAGE_UPLOAD}
                                getImageUrlList={this.handleMainImage}
                                fileList={[]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="商品图片"
                            required={true}
                            {...imagesValdate}
                        >
                            <UploadImage
                                max={5}
                                action={PRODUCT_IMAGE_UPLOAD}
                                getImageUrlList={this.handleImages}
                                fileList={[]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="商品详情"
                            name="detail"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商品描述!',
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
    categories: state.get('product').get('categories'),
    allAttrs: state.get('product').get('allAttrs'),

})

const mapDispatchToProps = (dispatch) => ({
    handleLevelCategories: () => {
        dispatch(actionCreator.getLevelCategoriesAction())
    },
    handleAllAttrs: () => {
        dispatch(actionCreator.getAllAttrsAction())
    },
    handleSave: (values, id) => {
        console.log(values)
        // dispatch(actionCreator.getSaveAction(values, id))
    },


})
export default connect(mapStateToProps, mapDispatchToProps)(ProductSave)
