import React from 'react'
import { Layout, Breadcrumb, Form, Input, Tag, Image } from 'antd';

const { Content } = Layout;

import CustomLayout from 'components/custom-layout'
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

class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.productId,
            product: {}
        }
        this.formRef = React.createRef()
    }

    async componentDidMount() {
        if (this.state.id) {//编辑页面
            const result = await api.getProductDetail({ id: this.state.id })
            if (result.code == '0') {//回填数据
                const data = result.data
                this.formRef.current.setFieldsValue({
                    category: data.category.name,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    payNums: data.payNums,

                })
                this.setState({
                    product: data
                })
            }
        }
    }

    render() {
        const { attrs, mainImage, images, detail } = this.state.product
        let attrTags = null
        let imagesWrap = null
        if (attrs) {
            attrTags = attrs.map((attr) => <Tag key={attr._id}>{attr.key}</Tag>)
        }
        if (images) {

            imagesWrap = images.split(',').map((image, index) => <Image key={index} src={image} />)
        }

        return (
            <CustomLayout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>商品</Breadcrumb.Item>
                    <Breadcrumb.Item>商品详情</Breadcrumb.Item>
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
                        ref={this.formRef}
                    >
                        <Form.Item
                            name="category"
                            label="商品分类"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="商品名称"
                            name="name"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="商品描述"
                            name="description"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="商品价格"
                            name="price"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="商品库存"
                            name="stock"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="支付人数"
                            name="payNums"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            label="商品属性"

                        >
                            {attrTags}
                        </Form.Item>
                        <Form.Item
                            label="封面图片"

                        >
                            <Image
                                width={100}
                                src={mainImage}
                            />
                        </Form.Item>
                        <Form.Item
                            label="商品图片"

                        >
                            {imagesWrap}
                        </Form.Item>
                        <Form.Item
                            label="商品详情"

                        // labelCol={
                        //     { span: 6, }
                        // }
                        // wrapperCol={
                        //     { span: 16, }
                        // }
                        >
                            <div style={{ marginTop: 5 }} dangerouslySetInnerHTML={{ __html: detail }}></div>
                        </Form.Item>
                    </Form>
                </Content>
            </CustomLayout>
        )
    }
}



export default ProductDetail
