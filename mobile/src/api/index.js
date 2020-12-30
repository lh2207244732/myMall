import axios from 'axios'
// import { goLogin, removeUsername } from '../util'

import { SERVER, VERSION, API_CONFIG } from './config'

/**
 * 根据配置文件生成一个对象
 * 这个对象的每一个属性名都是一个方法名，属性值是一个api的调用方法
 */
const getApiobj = (apiConfig) => {
    const apiobj = {}
    for (let key in apiConfig) {
        apiobj[key] = (data) => {
            const url = SERVER + '/' + VERSION + apiConfig[key][0] || ''
            const method = apiConfig[key][1] || 'get'
            //发送请求
            return request(url, method, data)
        }
    }
    return apiobj
}
const request = (url, method, data) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: method,
            url: url
        }
        switch (method.toUpperCase()) {
            case 'GET':
                options.params = data
                break;
            default:
                options.data = data
        }
        axios(options)
            .then(result => {
                const data = result.data
                if (data.code == 10) {
                    //没有权限
                    removeUsername()
                    goLogin()
                    reject('没有权限')
                } else {
                    resolve(data)
                }

            })
            .catch(error => {
                reject(error)
            })
    })
}
export default getApiobj(API_CONFIG)