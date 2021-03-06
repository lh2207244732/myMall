import React, { Fragment } from 'react'
import { Upload, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只支持上传 JPG/PNG 格式的图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('文件大小不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class UploadImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            loading: false,
            fileList: [],
            isUpdate: false
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.handlePreview = this.handlePreview.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    //更新组件时 调用render之前触发 必须返回一个对象更新state
    static getDerivedStateFromProps(props, state) {
        if (state.isUpdate) {
            //如果是更新，则不改变state
            return null
        } else {
            //不是更新，则根据父组件的fileList更新state
            return {
                fileList: props.fileList
            }
        }

    }

    handleCancel() {
        this.setState({ previewVisible: false })
    }

    async handlePreview(file) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange({ fileList }) {
        this.setState({
            fileList,
            isUpdate: true
        })
        const imageUrlList = fileList.map(item => {
            if (item.response && item.response.status == 'done') {
                return item.response.url
            }
        }).join(',')
        this.props.getImageUrlList(imageUrlList)
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        const { max, action } = this.props
        return (
            <Fragment>
                <Upload
                    action={action}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={beforeUpload}
                >
                    {/* 设置最大图片数 */}
                    {fileList.length >= max ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Fragment>
        )
    }
}
export default UploadImage