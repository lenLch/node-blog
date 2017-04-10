/**
 * Created by len on 17-3-30.
 */

var mongoose = require('mongoose');

var contentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Content',contentsSchema);