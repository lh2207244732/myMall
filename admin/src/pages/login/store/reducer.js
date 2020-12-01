import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'
//定义一个初始的state
const defaultState = fromJS(
    {
        isFetching: false,
        captcha: ''
    }
)
function reducer(state = defaultState, action) {
    return state
}
export default reducer