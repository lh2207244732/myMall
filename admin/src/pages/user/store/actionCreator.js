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
        console.log(2345)
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