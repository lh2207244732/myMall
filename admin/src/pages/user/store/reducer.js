import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'
//定义一个初始的state
const defaultState = fromJS(
    {
        list: [],
        current: 1,
        pageSize: 0,
        total: 0
    }
)
function reducer(state = defaultState, action) {
    if (action.type == actionTypes.SET_PAGE) {
        const { list, current, pageSize, total } = action.payload
        console.log(current)
        return state.merge({
            list: list,
            current: current,
            pageSize: pageSize,
            total: total
        })
    }
    return state
}
export default reducer