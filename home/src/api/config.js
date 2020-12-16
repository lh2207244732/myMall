//这是自建api的配置文件
export const SERVER = process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''
export const VERSION = 'v1'



export const API_CONFIG = {
    //方法名称：['请求地址','请求类型']
    register: ['/users', 'post'],
    getCaptcha: ['/users/captcha', 'get'],
    login: ['/users/login', 'post'],
    logout: ['/users/logout', 'get'],
    getVerifyCode:['/users//registerVerifyCode','get']
}
