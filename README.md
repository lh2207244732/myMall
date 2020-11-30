# myMall
这是一个全栈的商城项目
前端采用jQuery构建页面，后端采用React组件构建管理员页面

前端监听在http://127.0.0.1:3001端口
后端监听在http://127.0.0.1:3000端口
本次采用服务器端配置代理的方式解决跨域问题（webpack搜索webpackServer）使用proxy

后端返回的验证码格式是svg文件，因此需要下面代码来正常显示html代码
<!-- <div dangerouslySetInnerHTML={{__html:result.data.data}}></div> -->


