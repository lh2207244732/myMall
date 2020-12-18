require('./index.less')
var api = require('api')
var tpl =require('./index.tpl')

var page = {
    init: function () {
        this.$cartContent = $('.top .cart-content');
        this.loadUsername()
        this.loadCarsCount()
        this.bindEvent()
    },
    loadUsername: function () {
        //获取同户名
        api.getUsername({
            success: function (result) {
                $('.not-login').hide()
                $('.user').show().find('.username').text(result.username)
            }
        })
    },
    bindEvent: function () {
        var _this = this 
        //退出操作
        $('#logout').on('click', function () {
            api.logout({
                success: function () {
                    //刷新页面
                    window.location.reload()
                }
            })
        }),
        //购物车操作
        $('.nav-list .cart-box')
        .hover(function(){
            _this.$cartContent.show()
            _this.$cartContent.html('<div class="loader"></div>')
            //发送请求获取购物车数据
            api.getCarts({
                success:function(result){
                    _this.render(result)
                },
                error:function(){
                    _this.$cartContent.html('<span class="empty-cart">获取购物车失败,请稍后再试!</span>')
                }
            })
        },
        function(){
            _this.$cartContent.hide()
            _this.$cartContent.html('')
        }
        )
    },
    loadCarsCount:function(){
        var $cartNum = $('.nav-list .cart-count')
        //获取购物车中商品数并填充
        api.getCartsCount({
            success:function(result){
                $cartNum.text(result||0)
            },
            error:function(){
                $cartNum.text(0)
            }
        })   
    },
    render:function(cart){
        var _this=this
       if(cart.cartList.length==0) {
        _this.$cartContent.html('<span class="empty-cart">购物车中还没有商品,赶紧来购买吧!</span>')
       }else{
        var html = _util.render(tpl, cart);
        _this.$cartContent.html(html)
       }
    }
}

$(function () {
    page.init()
})