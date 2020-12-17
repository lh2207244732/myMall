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
        this.bindEvent()
        this.handleTimer()

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
            //发送获取手机验证码请求
            $('#btn-verify-code').on('click', function () {
                _this.getVerifyCodeRequest()
            })
    },

    //登录请求的提交
    submit: function () {
        //1.获取表单的数据
        //2.验证
        //3.发送ajax请求
        var formData = {
            phone: $('input[name="phone"]').val(),
            verifyCode: $('input[name="verify-code"]').val()
        }
        var result = this.validate(formData)
        if (result.status) {
            // 验证通过
            formErr.hide()
            api.dynamicLogin({
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
        if (!_util.validate(formData.phone, 'require')) {
            result.msg = '请输入手机号'
            return result
        }
        if (!_util.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确'
            return result
        }
        //验证码验证
        if (!_util.validate(formData.verifyCode, 'require')) {
            result.msg = '请输入手机短信验证码'
            return result
        }
        if (!_util.validate(formData.verifyCode, 'verifyCode')) {
            result.msg = '短信验证码格式不正确'
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
    //获取手机验证码请求
    getVerifyCodeRequest: function () {
        //1.验证手机号和图形验证码
        //2.发送ajax请求
        var _this = this
        var phone = $('input[name="phone"]').val()
        var captchaCode = $('input[name="captcha-code"]').val()
        if (!_util.validate(phone, 'require')) {
            formErr.show('请输入手机号')
            return
        }
        if (!_util.validate(phone, 'phone')) {
            formErr.show('手机号格式不正确')
            return
        }
        formErr.hide()
        api.getLoginVerifyCode({
            data: {
                phone: phone,
                captchaCode: captchaCode
            },
            success: function (result) {
                _util.showSuccessMsg('验证码发送成功')
                $('input[name="captcha-code"]').val('')
                $('.captcha-box').hide()
                //在本地localStorage存储发送的时间
                window.localStorage.setItem('getRegisterVerifyCodeTime', Date.now())
                //开始倒计时
                _this.handleTimer()
            },
            error: function (msg) {

                formErr.show(msg)
            }
        })
    },
    //处理倒计时
    handleTimer: function () {
        var _this = this
        var $btn = $('#btn-verify-code')
        var totalSecond = 60 //设置总共倒计时的秒数
        //获取本地localStorage存储发送的时间
        var getRegisterVerifyCodeTime = window.localStorage.getItem('getRegisterVerifyCodeTime')
        if (getRegisterVerifyCodeTime) {
            var passedSecond = parseInt((Date.now() - getRegisterVerifyCodeTime) / 1000)
            var restSecond = totalSecond - passedSecond//计算剩余时间
            if (restSecond > 0) {
                $btn.addClass('disable-btn')//禁用按钮
                $btn.html(restSecond + 's后重试')
                _this.timer = setInterval(function () {
                    passedSecond = parseInt((Date.now() - getRegisterVerifyCodeTime) / 1000)
                    restSecond = totalSecond - passedSecond//计算剩余时间
                    if (restSecond <= 0) {
                        clearInterval(_this.timer)
                        $btn.removeClass('disable-btn')//解除禁用
                        window.localStorage.removeItem('getRegisterVerifyCodeTime')//删除本地localStorage存储发送的时间
                    } else {
                        $btn.removeClass('disable-btn').html('获取验证码')
                        window.localStorage.removeItem('getRegisterVerifyCodeTime')
                    }
                }, 1000)
            }

        }
    }
}
$(function () {
    page.init()
})