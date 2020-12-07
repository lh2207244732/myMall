import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'
//定义一个初始的state
const defaultState = fromJS(
    {
        usernum: 0,
        ordernum: 0,
        productnum: 0
    }
)
function reducer(state = defaultState, action) {
    if (action.type == actionTypes.SET_COUNTS) {
        const { usernum, productnum, ordernum } = action.payload

        return state.merge({
            usernum: usernum,
            productnum: productnum,
            ordernum: ordernum
        })
    }
    return state
}
export default reducer