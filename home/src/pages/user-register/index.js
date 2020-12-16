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

var pages = {
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
        $('input').on('keydown',function(ev){
            if(ev.keyCode == 13){
                _this.submit()
            }
        }),
        //添加获取验证码事件
        $('.btn-verify').on('click',function(){
            if($(this).hasClass('disable-btn')){return}
           //显示获取图形验证码
            $('.captcha-box').show()
            _this.getCaptcha()
        }),
        //点击刷新验证码
        $('.captcha-img').on('click',function(){
            _this.getCaptcha()
        }),
        //发送获取手机验证码请求
        $('#btn-captcha-code').on('click',function(){
            _this.getVerifyCodeRequest( )
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
            formErr.hide()
            api.register({
                data: formData,
                success: function (result) {
                    console.log('请求成功')
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
    },
    //获取图形验证码
    getCaptcha:function(){
       api.getCaptcha({
           success:function(result){
               $('.captcha-img').html(result)
           }
       })
       
    },
    //获取手机验证码请求
    getVerifyCodeRequest:function(){
            //1.验证手机号和图形验证码
            //2.发送ajax请求
            var _this=this
            var phone=$('input[name="phone"]').val()
            var captchaCode=$('input[name="captcha-code"]').val()
            if (!_util.validate(phone, 'require')) {
                formErr.show('请输入手机号')
                this.getCaptcha()
                return 
            }
            if (!_util.validate(phone, 'phone')) {
                formErr.show('手机号格式不正确')
                this.getCaptcha()
                return 
            }
            if (!_util.validate(captchaCode, 'require')) {
                formErr.show('请输入图形验证码')
                this.getCaptcha()
                return 
            }
            if (!_util.validate(captchaCode, 'captchaCode')) {
                formErr.show('图形验证码格式不正确')
                this.getCaptcha()
                return 
            }
            formErr.hide()
            api.getVerifyCode({
                data:{
                    phone:phone,
                    captchaCode:captchaCode
                },
                success:function(result){
                    _util.showSuccessMsg('验证码发送成功')
                    $('input[name="captcha-code"]').val('')
                    $('.captcha-box').hide()
                    //在本地localStorage存储发送的时间
                    window.localStorage.setItem('getRegisterVerifyCodeTime',Date.now())
                    //开始倒计时
                    _this.handleTimer()
                },
                error:function(msg){
                    
                    formErr.show(msg)
                }
            })
    },
    //处理倒计时
    handleTimer:function(){
        var _this=this
        var $btn=$('.btn-verify')
        var totalSecond=60 //设置总共倒计时的秒数
        //获取本地localStorage存储发送的时间
        var getRegisterVerifyCodeTime=window.localStorage.getItem('getRegisterVerifyCodeTime')
        if(getRegisterVerifyCodeTime){
            var passedSecond=parseInt((Date.now()-getRegisterVerifyCodeTime)/1000)
            var restSecond=totalSecond-passedSecond//计算剩余时间
            if(restSecond>0){
                $btn.addClass('disable-btn')//禁用按钮
                $btn.html(restSecond+'s后重试')
                _this.timer=setInterval(function(){
                    passedSecond=parseInt((Date.now()-getRegisterVerifyCodeTime)/1000)
                    restSecond=totalSecond-passedSecond//计算剩余时间
                    if(restSecond<=0){
                            clearInterval(_this.timer)
                            $btn.removeClass('disable-btn')//解除禁用
                    }else{
                        $btn.html(restSecond+'s后重试')
                    }
                },1000)
            }

        }
    }

}

$(function () {
    pages.init()
})