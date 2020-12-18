const mongoose = require('mongoose');

const VerifySchema = new mongoose.Schema({
  //手机号
  phone: {
    type: String
  },
  //验证码
  code: {
    type: String
  },
  //验证码类型
  codeType: {
    type: String,
    enum: ["10", "20"],//10-登陆 20-注册
    default: "10"
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,//5分钟后删除 
  }
});

const VerifyModel = mongoose.model('Verify', VerifySchema);

module.exports = VerifyModel;