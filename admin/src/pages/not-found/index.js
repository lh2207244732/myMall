import React from 'react'
import { Result, Button } from 'antd';

import { goHome } from 'util'

class NotFound extends React.Component {
    render() {
        return (
            <div className='NotFound'>
                <Result
                    status="404"
                    title="404"
                    subTitle="您访问的页面走丢了！！！"
                    extra={<Button type="primary" onClick={() => { goHome() }}>返回首页</Button>}
                />
            </div>
        )
    }
}
export default NotFound