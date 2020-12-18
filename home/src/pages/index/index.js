var Swiper = require('swiper');  

var api =require('api')
var _util=require('util')

require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

require('./index.less')
require('swiper/swiper-bundle.min.css')

var childCategoriesTpl=require('./categories.tpl')

var page={
    init:function(){
       
        this.loadHomeCategories()
        this.loadSwiper()
        this.loadHotProducts()
        this.loadFloor()
        this.bindEvent()
    },
    bindEvent:function(){

    },
    loadHomeCategories:function(){//初始化首页分类
        api.getArrayCategories({
            success:function(categories){
                console.log(categories)
                var categoriesHtml = _util.render(childCategoriesTpl,{
                    categories:categories
                })
                $('.child-categories').html(categoriesHtml)  
            }
        })

    },
    loadSwiper:function(){//初始化轮播图

    },
    loadHotProducts:function(){//初始化热销商品

    },
    loadFloor:function(){//初始化楼层
        
    }
}

$(function(){
    page.init()
})

