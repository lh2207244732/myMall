import api from 'api'
import { message } from 'antd'

import * as types from './actionTypes'


const setPage = (payload) => ({
    type: types.SET_PAGE,
    payload: payload
})
const setAllAttrs = (payload) => ({
    type: types.SET_ALL_ATTRS,
    payload: payload
})
const getPageRequestStart = () => ({
    type: types.PAGE_REQUEST_START
})
const getPageRequestEnd = () => ({
    type: types.PAGE_REQUEST_END
})
export const setCategories = (payload) => ({
    type: types.SET_CATEGORIES,
    payload: payload
})
//获取分页
export const getPageAction = (page) => {
    return async function (dispatch) {
        dispatch(getPageRequestStart())
        try {
            //注意此处后台接受的是一个对象
            const result = await api.getAttrList({
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

//获取分类
export const getLevelCategoriesAction = () => {
    return async function (dispatch) {
        try {
            const result = await api.getlevelCategories({
                level: 3
            })
            if (result.code == 0) {
                dispatch(setCategories(result.data))
            }
        } catch (error) {
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }

    }
}

//获取所有属性
export const getAllAttrsAction = () => {
    return async function (dispatch) {
        try {
            const result = await api.getAttrs()
            if (result.code == 0) {
                dispatch(setAllAttrs(result.data))
            }
        } catch (error) {
            console.log(error)
            message.error('网络请求失败', 1)
        } finally {
            dispatch(getPageRequestEnd())
        }

    }
}



//更新排序
export const updataOrder = (id, newOrder) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('attr').get('current')
        try {
            //注意此处后台接受的是一个对象
            const result = await api.UpdataAttrOrder({
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


//提交保存
export const getSaveAction = (values, id) => {
    return async function (dispatch, getState) {
        try {
            let request = api.addAttr
            let actionMessage = '添加属性成功'
            if (id) {
                values.id = id
                request = api.updateAttr
                actionMessage = '修改属性成功'
            }
            const result = await request(values)
            if (result.code == 0) {
                message.success(actionMessage, 1)
                //派发请求，改变属性
                dispatch(setAttrs(result.data))

            } else {
                message.error(result.message, 1)
            }
        } catch (error) {
            console.log(error)
            message.error('网络请求失败', 1)
        }

    }
}




