const util = require('../../util')

require('pages/common/logo')
require('pages/common/footer')
require('./index.less')

var _util = require('util')
var formErr = {
    showErr: function (msg) {
        $('.error-item').show()
            .find('.error-msg').html(msg)
    },
    hideErr: function () {
        $('.error-item').hide()
            .find('.error-msg').html('')
    }
}


var pages = {
    init: function () {
        this.bindEvent()
    },
    bindEvent: function () {
        var _this = this
        //添加提交事件
        $('#btn-submit').on('click', function () {
            _this.submit()
        })
    },
    //注册的提交
    submit: function () {
        //1.获取表单的数据
        //2.验证
        //3.发送ajax请求
        var formData = {
            phone: $('input[name="phone"]').val(),
            verifyCode: $('input[name="verify-code"]').val(),
            password: $('input[name="password"]').val(),
            repassword: $('input[name="repassword"]').val(),
        }
        var result = this.validate(formData)
        if (result.status) {
            // 验证通过
            formErr.hideErr()
        } else {
            //验证不通过
            formErr.showErr(result.msg)
        }
    },
    //验证数据
    validate: function (formData) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_util.validate(formData.phone, 'require')) {
            result.msg = '请输入手机号'
            return result
        }
        if (!_util.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确'
            return result
        }
        if (!_util.validate(formData.verifyCode, 'require')) {
            result.msg = '请输入手机短信验证码'
            return result
        }
        if (!_util.validate(formData.verifyCode, 'verifyCode')) {
            result.msg = '验证码格式不正确'
            return result
        }
        if (!_util.validate(formData.password, 'require')) {
            result.msg = '请输入密码'
            return result
        }
        if (!_util.validate(formData.password, 'password')) {
            result.msg = '密码格式不正确'
            return result
        }
        if (formData.repassword != formData.password) {
            result.msg = '两次输入密码不一致'
            return result
        }


        result.status = true
        return result
    }
}

$(function () {

    pages.init()
})