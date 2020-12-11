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
export const getPageAction = (page) => {
    return async function (dispatch) {
        dispatch(getPageRequestStart())
        try {
            //注意此处后台接受的是一个对象
            const result = await api.getCategoryList({
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

//更新分类名
export const updataName = (id, newName) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try {
            //注意此处后台接受的是一个对象
            const result = await api.UpdataCategoriesName({
                id: id,
                name: newName,
                page: page
            })
            if (result.code == 0) {
                dispatch(setPage(result.data))
                message.success('更改分类名成功', 1)
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

//更新手机分类名
export const updataMobileName = (id, newMobileName) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try {
            //注意此处后台接受的是一个对象
            const result = await api.UpdataCategoriesMobileName({
                id: id,
                mobileName: newMobileName,
                page: page
            })

            if (result.code == 0) {
                dispatch(setPage(result.data))
                message.success('更改手机分类名成功', 1)
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

//更新显示状态
export const updataIsShow = (id, newIsShow) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try {
            //注意此处后台接受的是一个对象
            const result = await api.UpdataCategoriesIsShow({
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

//更新是否显示在楼层
export const updataIsFloor = (id, newIsFloor) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try {
            //注意此处后台接受的是一个对象
            const result = await api.UpdataCategoriesIsFloor({
                id: id,
                isFloor: newIsFloor,
                page: page
            })
            if (result.code == 0) {
                dispatch(setPage(result.data))
                message.success('更改楼层显示状态成功', 1)
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

//更新排序
export const updataOrder = (id, newOrder) => {
    return async function (dispatch, getState) {
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try {
            //注意此处后台接受的是一个对象
            const result = await api.UpdataCategoriesOrder({
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
export const setIcon = (payload) => ({
    type: types.SET_ICON,
    payload: payload
})

const setIconError = () => ({
    type: types.SET_ICON_ERROR
})
export const setCategories = (payload) => ({
    type: types.SET_CATEGORIES,
    payload: payload
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
            console.log(values)
            const result = await api.addCategory(values)
            if (result.code == 0) {
                message.success('添加分类成功', 1)
                //派发请求，改变分类列表状态
                dispatch(setCategories(result.data))

            } else {
                message.error(result.message, 1)
            }
        } catch (error) {
            message.error('网络请求失败', 1)
        }

    }
}



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

export const getValdateAction = () => {
    return function (dispatch, getState) {

        const icon = getState().get('category').get('icon')
        if (!icon) {
            //如果没有icon表示没有上传图片,派发一个请求改变状态
            dispatch(setIconError())
            return
        }
    }
}
