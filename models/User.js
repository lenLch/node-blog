/**
 * Created by len on 17-3-19.
 */


/*
* 用于对用户的数据表进行增 删 改 查  操作
* */
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');

module.exports = mongoose.model('User',usersSchema);

