//作用：引入并合并所有组件的reducer
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as login } from 'pages/login/store'
import { reducer as home } from 'pages/home/store'
import { reducer as user } from 'pages/user/store'
import { reducer as category } from 'pages/category/store'
import { reducer as attr } from 'pages/attr/store'
import { reducer as product } from 'pages/product/store'
import { reducer as ad } from 'pages/ad/store'

//合并并导出reducer
export default combineReducers({
    login,
    home,
    user,
    category,
    attr,
    product,
    ad
})