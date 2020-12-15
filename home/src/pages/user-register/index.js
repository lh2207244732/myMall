require('pages/common/logo')
require('pages/common/footer')
require('./index.less')

const pages={
    init:function(){
        this.handleEvent()
    },
    handleEvent:function(){
        console.log('handle...')
    }
}

$(function(){

    pages.init()
})