//这是自建api的配置文件
export const SERVER = process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''
export const VERSION = 'v1'



export const API_CONFIG = {
    //方法名称：['请求地址','请求类型']
    login: ['/users/login', 'post'],
    getCaptcha: ['/users/captcha/', 'get'],
    getCounts: ['/counts/', 'get'],
    logout: ['/users/logout', 'get'],
    getUrlList: ['/users/list', 'get'],
    UpdataUserActive: ['/users/isActive', 'put'],
    UpdataUserPwd: ['/users/pwd', 'put'],


    addCategory: ['/categories', 'post'],
    updateCategory: ['/categories', 'put'],
    getlevelCategories: ['/categories/levelCategories', 'get'],
    getCategoryList: ['/categories/list', 'get'],
    getCategoryDetail: ['/categories/detail', 'get'],
    UpdataCategoriesName: ['/categories/name', 'put'],
    UpdataCategoriesMobileName: ['/categories/mobileName', 'put'],
    UpdataCategoriesIsShow: ['/categories/isShow', 'put'],
    UpdataCategoriesIsFloor: ['/categories/isFloor', 'put'],
    UpdataCategoriesOrder: ['/categories/order', 'put'],


    getAttrList: ['/attrs/list', 'get'],
    getAttrDetail: ['/attrs/detail', 'get'],
    addAttr: ['/attrs/', 'post'],
    UpdataAttrOrder: ['/attrs/order', 'put'],
    updateAttr: ['/attrs/', 'put'],
    getAttrs: ['/attrs/allAttrs', 'get'],

    addProduct: ['/products', 'post'],
    updateProduct: ['/products', 'put'],
    getProductList: ['/products/list', 'get'],
    getProductDetail: ['/products/detail', 'get'],
    UpdataProductsIsShow: ['/products/isShow', 'put'],
    UpdataProductsStatus: ['/products/status', 'put'],
    UpdataProductsisHot: ['/products/isHot', 'put'],
    UpdataProductsOrder: ['/products/order', 'put'],

    addAd: ['/ads', 'post'],
    updateAd: ['/ads', 'put'],
    getAdList: ['/ads/list', 'get'],
    getAdDetail: ['/ads/detail', 'get'],
    UpdataAdIsShow: ['/ads/isShow', 'put'],
    UpdataAdOrder: ['/ads/order', 'put'],

    getPositionAds: ['/ads/positionAds', 'get'],
}
