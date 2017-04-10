/**
 * Created by len on 17-3-28.
 */
/**
 * Created by len on 17-3-19.
 * 数据库的操作
 */

var mongoose = require('mongoose');

// 分类的表结构

module.exports = new mongoose.Schema({

    // 分类名称
    name: String,

});