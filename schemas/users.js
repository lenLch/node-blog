/**
 * Created by len on 17-3-19.
 * 数据库的操作
 */

var mongoose = require('mongoose');

// 用户的表结构

module.exports = new mongoose.Schema({

    // 用户名
    username: String,
    // 密码
    password: String,
    // 是否是管理员
    isAdmin: {
        type: Boolean,
        default: false
    }

});