/**
 * Created by len on 17-3-19.
 */

/*
* 首页
* */

var express = require('express');
var router = express.Router();

var Category = require('../models/Category');
var Content = require('../models/Content');


router.get('/register',function(req,res,next){
    res.render('main/register');
});

router.get('/login',function(req,res,next){
    res.render('main/login');
});

var data;
/*
* 处理通用信息
* */
router.use(function(req,res,next){
    data = {
        userInfo: req.userInfo,
        newUserInfo: req.newUserInfo,
        categories: []
    };

    Category.find().then(function(categories){
        data.categories = categories;
        next();
    });
});

/*
* 首页
* */
router.get('/',function(req,res,next){

    data.category = req.query.category || '';
    data.contents = [];
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 10;
    data.pages = 0;

    var where = {};

    if(data.category){
        where.category = data.category
    }

    // 读取所有的分类信息
    Content.where(where).count().then(function(count){

        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min(data.page,data.pages);
        data.page = Math.max(data.page,1);
        var skip = (data.page - 1) * data.limit;



        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category','user']).sort({addTime: -1});

    }).then(function(contents){
        data.contents = contents;
        // console.log(data);
        res.render('main/index',data);
    });
});

router.get('/view',function(req,res){

    var contentId = req.query.contentid || '';

    Content.findOne({
        _id: contentId
    }).then(function(content){
        data.content = content;

        content.views++;
        content.save();
        console.log(content)
        res.render('main/view',data);
    });

});

module.exports = router;