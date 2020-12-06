import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'
//定义一个初始的state
const defaultState = fromJS(
    {
        list: []
    }
)
function reducer(state = defaultState, action) {
    if (action.type == actionTypes.SET_PAGE) {
        const { list } = action.payload
        return state.set('list', list)
    }
    return state
}
export default reducer