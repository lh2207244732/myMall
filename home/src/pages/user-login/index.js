require('pages/common/logo')
require('pages/common/footer')
require('./index.less')

var _util = require('util')
var api = require('api')
var formErr = {
    show: function (msg) {
        $('.error-item').show()
            .find('.error-msg').html(msg)
    },
    hide: function () {
        $('.error-item').hide()
            .find('.error-msg').html('')
    }
}

var page = {
    init: function () {
        this.getCaptcha()
        this.bindEvent()

    },
    getCaptcha: function () {
        //获取并设置图形验证码
        api.getCaptcha({
            success: function (result) {
                $('.captcha-img').html(result)
            }
        })
    },
    bindEvent: function () {
        var _this = this
        //添加提交事件
        $('#btn-submit').on('click', function () {
            _this.submit()
        }),
            //回车提交事件
            $('input').on('keydown', function (ev) {
                if (ev.keyCode == 13) {
                    _this.submit()
                }
            }),
            //点击刷新验证码
            $('.captcha-img').on('click', function () {
                _this.getCaptcha()
            })

    },

    //登录请求的提交
    submit: function () {
        //1.获取表单的数据
        //2.验证
        //3.发送ajax请求
        var formData = {
            username: $('input[name="username"]').val(),
            captchaCode: $('input[name="captcha-code"]').val(),
            password: $('input[name="password"]').val(),
        }
        var result = this.validate(formData)
        if (result.status) {
            // 验证通过
            formErr.hide()
            api.login({
                data: formData,
                success: function (result) {
                    //验证通过，重定向或者去往首页
                    window.location.href = _util.getParamFromUrl('redirect') || '/'
                },
                error: function (msg) {
                    formErr.show(msg)
                }
            })
        } else {
            alert('验证不通过...')
            //验证不通过
            formErr.show(result.msg)
        }
    },
    //验证数据
    validate: function (formData) {
        var result = {
            status: false,
            msg: ''
        }
        // 校验数据
        //用户名验证
        if (!_util.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空'
            return result
        }
        if (!_util.validate(formData.username, 'username')) {
            result.msg = '用户名格式不正确'
            return result
        }
        //密码验证
        if (!_util.validate(formData.password, 'require')) {
            result.msg = '请输入密码'
            return result
        }
        if (!_util.validate(formData.password, 'password')) {
            result.msg = '密码格式不正确'
            return result
        }
        //图形验证码验证
        if (!_util.validate(formData.captchaCode, 'require')) {
            result.msg = '请输入图形验证码'
            return result
        }
        if (!_util.validate(formData.captchaCode, 'captchaCode')) {
            result.msg = '图形验证码格式不正确'
            return result
        }
        result.status = true
        return result
    },
    //获取图形验证码
    getCaptcha: function () {
        api.getCaptcha({
            success: function (result) {
                $('.captcha-img').html(result)
            }
        })

    },
}
$(function () {
    page.init()
})