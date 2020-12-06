/**
 * 用来生成随机测试的用户列表数据
 */
const mongoose = require('mongoose')
const UserModel = require('../models/user.js')
const hmac = require('./hmac.js')
const { getRandomNum, getRandomStr } = require('./random.js')

//启动数据库
mongoose.connect('mongodb://localhost:27017/kmallm11', { useNewUrlParser: true })

//连接数据库
const db = mongoose.connection

db.on('error', (error) => {
    throw error
})
/**
  username:{
        type:String
  },
  password:{
        type:String
  },
  isAdmin:{
        type:Boolean,
        default:false//默认是普通用户
  },
  avatar:{
    type:String,
  },
  isActive:{
      type: String,
      default: '1' //是否是有效用户 0-不是 1-是
  },  
  email:{
    type:String
  },
  phone:{
    type:String
  },
  wxopenid:{
    type:String //微信openid
  },
  token:{
    type:String //微信登录凭证
  },
  cart:{
    type:CartSchema
  },
  shipping:{
    type:[ShippingSchema],
    default:[]
  }
 */
db.on('open', () => {
    console.log('db is connect...')
    const users = []
    for (let i = 0; i < 100; i++) {
        let username = getRandomNum(131111111111, 19199999999)
        users.push({
            username: username,
            password: hmac(username + ''),
            isAdmin: i % 2 ? true : false,
            isActive: i % 2 ? '0' : '1',
            email: getRandomStr(5, getRandomStr.alpha) + '@qq.com',
            phone: username,
            wxopenid: getRandomStr(10, getRandomStr.alpha)
        })
    }
    UserModel.insertMany(users)
    console.log('insert success...')
})