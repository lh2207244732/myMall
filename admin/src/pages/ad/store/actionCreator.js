import api from 'api'
import { message } from 'antd'

import * as types from './actionTypes'


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


//获取分页
export const getPageAction = (page) => {
    return async function (dispatch) {
        dispatch(getPageRequestStart())
        try {
            //注意此处后台接受的是一个对象
            const result = await api.getAdList({
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


//更新显示状态
export const updataIsShow = (id, newIsShow) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('ad').get('current')
        try {
            //注意此处后台接受的是一个对象
            const result = await api.UpdataAdIsShow({
                id: id,
                isShow: newIsShow,
                page: page
            })
            if (result.code == 0) {
                dispatch(setPage(result.data))
                message.success('更改显示状态成功', 1)
            } else {
                message.error(result.message, 1)
            }

        } catch (error) {
            message.error('更新用户状态失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }

    }
}

//更新排序
export const updataOrder = (id, newOrder) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('ad').get('current')
        try {
            //注意此处后台接受的是一个对象
            const result = await api.UpdataAdOrder({
                id: id,
                order: newOrder,
                page: page
            })
            if (result.code == 0) {
                dispatch(setPage(result.data))
                message.success('更改排序成功', 1)
            } else {
                message.error(result.message, 1)
            }

        } catch (error) {
            message.error('网络连接失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }

    }
}

export const getSaveAction = (values,) => {
    return async function (dispatch, getState) {
        try {
            let request = api.addAd
            let actionMessage = '添加广告成功'
            if (values.id) {
                request = api.updateAd
                actionMessage = '修改广告成功'
            }
            const result = await request(values)
            if (result.code == 0) {
                message.success(actionMessage, 1)

            } else {
                message.error(result.message, 1)
            }
        } catch (error) {
            message.error('网络请求失败', 1)
        }

    }
}




