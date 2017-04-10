/**
 * Created by len on 17-3-19.
 * 应用程序的启动（入口）文件
 */
// 加载express模块
var express = require('express');
// 加载模板处理模块
var swig = require('swig');
// 加载数据库模块
var mongoose = require('mongoose');
// 加载body-parser模块用来处理post提交过来的数据
var bodyParser = require('body-parser');
// 加载cookies模块
var cookies = require('cookies');
// 创建app应用  ==> nodejs http.createServer();
var app = express();

var User = require('./models/User');

// 设置静态文件托管
// 当用户访问的url以/public开始，那么直接返回对应的__dirname + '/public'下的文件
app.use('/public',express.static(__dirname + '/public'));

/*
* 配置应用模板
* 定义当前应用所使用的模板引擎
* 第一个参数： 模板引擎的名称，同时也是模板文件的后缀
* 第二个参数，表示用于解析处理模板内容的方法
* */
app.engine('html',swig.renderFile);
// 设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views','./views');
//注册所使用的模板引擎，第一个参数必须是view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine','html');
// 在开发过程当中，需要取消模板缓存
swig.setDefaults({cache: false});

// bodyparser设置
app.use(bodyParser.urlencoded({extend: true}));

// 设置cookies
app.use(function (req,res,next) {
   req.cookies = new cookies(req,res);

   // 解析登陆用户的cookies信息
   req.userInfo = {};
   req.newUserInfo = {};

   if (req.cookies.get('userInfo')){
       try{
           req.userInfo = JSON.parse(req.cookies.get('userInfo'));

           // 获取当前登陆的用户类型，是否是管理员
           User.findById(req.userInfo._id).then(function (userInfo) {
               req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
               next();
           });
       }catch(e) {
           next();
       }
   }else if (req.cookies.get('newUserInfo')){
        try{
            req.newUserInfo = JSON.parse(req.cookies.get('newUserInfo'));
            User.findById(req.newUserInfo._id).then(function (newUserInfo) {
                req.newUserInfo.isAdmin = Boolean(newUserInfo.isAdmin);
                next();
            });
        }catch(e) {
            next();
        }
   }else {
       next();
   }
});

/*app.get('/',function (req,res,next) {
    // res.send('<h1>欢迎光临我的博客！</h1>');
    /!*
    * 读取views目录下的置顶文件，解析并返回给客户端
    * 第一个参数表示模板的文件，相对于views目录来的 views/index.html
    * 第二个参数，传递给模板使用的数据
    * *!/
    res.render('index');
});*/

/*
* 用户发送http请求 -> url -> 解析路由 -> 找到匹配的规则 -> 执行指定的绑定函数，返回对应内容至用户
* /public -> 静态 -> 直接读取指定目录下的文件，返回给用户 -> 动态 -> 处理业务逻辑，加载模板，解析模板， -> 返回数据给用户
* */

/*
* 根据不同的功能，划分模块
* */
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));


// 连接数据库
mongoose.connect('mongodb://localhost:27017/blog',function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        // 监听http请求
        app.listen(8000);
    }
});

