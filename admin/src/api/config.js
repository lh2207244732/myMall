//这是自建api的配置文件
export const SERVER = process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''
export const VERSION = 'v1'
export const CATEGORY_ICON_UPLOAD = SERVER + '/' + VERSION + '/categories/icons'
export const API_CONFIG = {
    //方法名称：['请求地址','请求类型']
    login: ['/users/login', 'post'],
    getCaptcha: ['/users/captcha/', 'get'],
    getCounts: ['/counts/', 'get'],
    logout: ['/users/logout', 'get'],
    getUrlList: ['/users/list', 'get'],
    UpdataUserActive: ['/users/isActive', 'put'],
    addCategory: ['/categories', 'post']
}
