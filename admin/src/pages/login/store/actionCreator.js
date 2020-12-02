
import axios from 'axios'
import { message } from 'antd';

import * as types from './actionTypes'
import { saveUsername } from 'util'

const getRequestStart = () => ({
    type: types.REQUEST_START
})
const getRequestEnd = () => ({
    type: types.REQUEST_END
})

export const getLoginAction = (values) => {
    return async function (dispatch) {

        //派发action 改变登录按钮状态
        dispatch(getRequestStart())

        const result = await axios({
            method: 'post',
            url: 'v1/users/login',
            data: {
                username: values.username,
                password: values.password,
                role: 'admin',
                captchaCode: values.captcha,
                channel: 'page'
            }
        })
        console.log(result)
        const data = result.data
        if (data.code == 1) {
            message.error(data.message, 1)
        } else {
            message.success('登录成功', 1)
            //保存登录状态
            saveUsername(data.data.username)
            //跳转到管理员后台首页
        }
        dispatch(getRequestEnd())
    }
}
const setCaptcha = (captcha) => ({
    type: types.SET_CAPTCHA,
    payload: captcha
})
export const getCaptchaAction = () => {
    return async function (dispatch) {
        const result = await axios({
            type: 'get',
            url: '/v1/users/captcha'
        })
        if (result.data.code == 0) {
            const captcha = result.data.data
            dispatch(setCaptcha(captcha))
        }
    }
}