import api from 'api'
import { message } from 'antd'

import * as types from './actionTypes'
import { Provider } from 'react-redux'

const setPage = (payload) => ({
    type: types.SET_PAGE,
    payload: payload
})
const getPageRequestStart = () => ({
    type: types.PAGE_REQUEST_START
})
const getPageRequestEnd = () => ({
    type: types.PAGE_REQUEST_END
})
export const getPageAction = (page) => {
    return async function (dispatch) {
        dispatch(getPageRequestStart())
        try {
            //注意此处后台接受的是一个对象
            const result = await api.getUrlList({
                page: page
            })
            if (result.code == 0) {
                dispatch(setPage(result.data))
            }
        } catch (error) {
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }

    }
}

export const updataUserIsActicve = (id, newActive) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('user').get('current')
        try {
            //注意此处后台接受的是一个对象
            const result = await api.UpdataUserActive({
                id: id,
                isActive: newActive,
                page: page
            })
            if (result.code == 0) {
                dispatch(setPage(result.data))
            }
            message.success('更新用户状态成功', 1)
        } catch (error) {
            message.error('更新用户状态失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }

    }
}

export const setIcon = (payload) => ({
    type: types.SET_ICON,
    payload: payload
})

const setIconError = () => ({
    type: types.SET_ICON_ERROR
})
export const getSaveAction = (values) => {
    return async function (dispatch, getState) {

        try {
            const icon = getState().get('category').get('icon')
            if (!icon) {
                //如果没有icon表示没有上传图片,派发一个请求改变状态
                dispatch(setIconError())
                return
            }
            values.icon = icon
            const result = await api.addCategory(values)
            if (result.code == 0) {
                message.success('添加分类成功', 1)
            } else {
                message.error(result.message, 1)
            }
        } catch (error) {
            message.error('网络请求失败', 1)
        }

    }
}