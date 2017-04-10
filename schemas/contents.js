/**
 * Created by len on 17-3-30.
 */


var mongoose = require('mongoose');

//内容的表结构
module.exports = new mongoose.Schema({

    // 关联字段 -- 分类的id
    category: {
        // 类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'Category'
    },
    // 关联字段 -- 用户ID
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'User'
    },
    // 分类标题
    title: String,
    // 时间
    addTime: {
        type: Date,
        default: new Date()
    },
    // 阅读量
    views: {
        type: Number,
        default: 0
    },
    //简介
    description: {
        type: String,
        default: ''
    },
    // 内容
    content: {
        type: String,
        default: ''
    },

    // 评论
    comments: {
        type: Array,
        default: []
    }
});