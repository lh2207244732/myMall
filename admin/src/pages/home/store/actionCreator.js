
import { message } from 'antd';

import * as types from './actionTypes'
import { saveUsername } from 'util'
import api from 'api'

const setCounts = (counts) => ({
    type: types.SET_COUNTS,
    payload: counts
})

export const getCountsAction = () => {
    return async function (dispatch) {
        const result = await api.getCounts()
        console.log(result)
        if (result.data.code == 0) {
            dispatch(setCounts(result.data))
        }
    }
}