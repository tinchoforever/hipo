var coreMongoose = require("../repositories/core-mongoose");

var mongoose = coreMongoose.mongoose;

//Schema idea
var transportOptions = 'bici colectivo auto nada'.split(' ')
var profileSchema = mongoose.Schema({
    tags: [String],
    name:String,
    start_time: String,
    end_time: String,
    transport: {type: String, enum: transportOptions},
    geo: String
})
module.exports = mongoose.model('profile', profileSchema);