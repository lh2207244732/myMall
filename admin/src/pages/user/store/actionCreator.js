
import * as types from './actionTypes'

import api from 'api'


const setPage = (payload) => ({
    type: types.SET_PAGE,
    payload: payload
})

export const getPageAction = (page) => {
    return async function (dispatch) {
        //注意此处后台接受的是一个对象
        const result = await api.getUrlList({
            page: page
        })
        if (result.code == 0) {
            dispatch(setPage(result.data))
        }
    }
}