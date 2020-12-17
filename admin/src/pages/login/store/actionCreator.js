
import { message } from 'antd';

import * as types from './actionTypes'
import { saveUsername, goHome } from 'util'
import api from 'api'

const getRequestStart = () => ({
    type: types.REQUEST_START
})
const getRequestEnd = () => ({
    type: types.REQUEST_END
})

//登录
export const getLoginAction = (values) => {
    return async function (dispatch) {

        //派发action 改变登录按钮状态
        dispatch(getRequestStart())
        const result = await api.login({
            username: values.username,
            password: values.password,
            role: 'admin',
            captchaCode: values.captcha,
            channel: 'page'
        })
        if (result.code == 1) {
            message.error(result.message, 1)
        } else {
            message.success('登录成功', 1)
            //保存登录状态
            saveUsername(result.data.username)
            //跳转到管理员后台首页
            goHome()
        }
        dispatch(getRequestEnd())
    }
}
const setCaptcha = (captcha) => ({
    type: types.SET_CAPTCHA,
    payload: captcha
})

//获取图形验证码
export const getCaptchaAction = () => {
    return async function (dispatch) {
        const result = await api.getCaptcha()
        if (result.code == 0) {
            const captcha = result.data
            dispatch(setCaptcha(captcha))
        }
    }
}