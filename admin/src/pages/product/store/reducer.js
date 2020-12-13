import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'
//定义一个初始的state
const defaultState = fromJS(
    {
        list: [],
        current: 1,
        pageSize: 0,
        total: 0,
        isFetching: false,
        categories: [],
        allAttrs: [],
    }
)
function reducer(state = defaultState, action) {
    if (action.type == actionTypes.SET_PAGE) {
        const { list, current, pageSize, total } = action.payload
        return state.merge({
            list: list,
            current: current,
            pageSize: pageSize,
            total: total
        })
    }
    if (action.type == actionTypes.PAGE_REQUEST_START) {
        return state.set('isFetching', true)
    }
    if (action.type == actionTypes.PAGE_REQUEST_END) {
        return state.set('isFetching', false)
    }

    if (action.type == actionTypes.SET_CATEGORIES) {
        return state.set('categories', action.payload)
    }

    if (action.type == actionTypes.SET_ALL_ATTRS) {
        return state.set('allAttrs', action.payload)
    }

    return state
}
export default reducer