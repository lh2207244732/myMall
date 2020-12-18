
import Swiper from 'swiper'

var api = require('api')
var _util = require('util')

require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('./index.less')
require('swiper/swiper-bundle.min.css')

var childCategoriesTpl = require('./categories.tpl')
var swiperTpl = require('./swiper.tpl')
var hotTpl = require('./hot.tpl')

var page = {
    init: function () {

        this.loadHomeCategories()
        this.loadSwiper()
        this.loadHotProducts()
        this.loadFloor()
        this.bindEvent()
    },
    bindEvent: function () {

    },
    loadHomeCategories: function () {//初始化首页分类
        api.getArrayCategories({
            success: function (categories) {
                console.log(categories)
                var categoriesHtml = _util.render(childCategoriesTpl, {
                    categories: categories
                })
                $('.parent-categories').html(categoriesHtml)
            }
        })

    },
    loadSwiper: function () {//初始化轮播图
        api.getPositionAds({
            data: {
                position: 1
            },
            success: function (data) {
                var html = _util.render(swiperTpl, {
                    slides: data
                })
                $('.swiper-container .swiper-wrapper').html(html)
                var mySwiper = new Swiper('.swiper-container', {
                    loop: true, // 循环模式选项
                    autoplay: true,
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })
            }
        })
    },
    loadHotProducts() {
        var _this = this
        api.getHotProducts({
            success: function (data) {
                var html = _util.render(hotTpl, {
                    products: data
                })
                $('.hot-bd').html(html)
            }
        })
    },
    loadFloor: function () {//初始化楼层

    }
}

$(function () {
    page.init()
})

