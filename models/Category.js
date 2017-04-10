/**
 * Created by len on 17-3-28.
 */
/**
 * Created by len on 17-3-19.
 */

var mongoose = require('mongoose');
var categoriesSchema = require('../schemas/categories');

module.exports = mongoose.model('Category',categoriesSchema);

