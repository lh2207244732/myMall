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
const clearInput = () => ({
    type: types.CLEAR_INPUT
})

//获取分页
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



export const setCategories = (payload) => ({
    type: types.SET_CATEGORIES,
    payload: payload
})

export const getSaveAction = (values,) => {
    return async function (dispatch, getState) {

        try {
            let request = api.addCategory
            let actionMessage = '添加分类成功'
            if (values.id) {
                request = api.updateCategory
                actionMessage = '修改分类成功'
            }
            const result = await request(values)
            if (result.code == 0) {
                message.success(actionMessage, 1)
                //派发请求，改变分类列表状态
                dispatch(setCategories(result.data))
                //改变input框状态
                dispatch(clearInput())

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
                level: 2
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


