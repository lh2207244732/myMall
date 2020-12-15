module.exports = {
    validate: function (value, type) {
        //非空验证
        if (type == 'require') {
            return !!value
        }
        //用户名格式验证
        if (type == 'username') {
            return /^[a-z0-9][a-z0-9_]{2,10}$/.test(value)
        }
        //密码格式验证
        if (type == 'password') {
            return /^\w{3,6}$/.test(value)
        }
        //电话号码格式验证
        if (type == 'phone') {
            return /^1[3589]\d{9}$/.test(value)
        }
        if (type == 'email') {
            return /^\w+@\w+\.\w{2,6}$/.test(value)
        }
        if (type == 'verifyCode') {
            return /^\d{6}$/.test(value)
        }
        if (type == 'captchaCode') {
            return /^[a-zA-Z0-9]{4}$/.test(value)
        }
    },
    goLogin: function () {
        window.location.href = '/user-login.html'
    }

}