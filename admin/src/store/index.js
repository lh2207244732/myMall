import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './reducer'


//原本action只能是对象，现在也可以是一个函数
const middlewares = []
middlewares.push(thunk)

//开发阶段打印日志
if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
    })
    middlewares.push(logger);
}

/**
 * 创建一个store给store指定reducer,一旦有action派发，就会调用这个reducer
 * 初始化store里面的state,调用一次reducer,action的类型是每次都会变化的字符串，reducer会返回一个默认的初始化state
 */
const store = createStore(reducer, applyMiddleware(...middlewares))
export default store