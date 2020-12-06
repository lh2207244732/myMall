//作用：引入并合并所有组件的reducer
// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'

import { reducer as login } from 'pages/login/store'
import { reducer as home } from 'pages/home/store'

//合并并导出reducer
export default combineReducers({
    login,
    home
})