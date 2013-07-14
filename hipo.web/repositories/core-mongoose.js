var mongoose = require('mongoose');
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/hipo';

console.log('active db' , uristring);
mongoose.connect(uristring);


exports.mongoose = mongoose;
