var beach       = require('./matchers/beach')
  , pedestrian  = require('./matchers/pedestrian')
  , surf        = require('./matchers/surf');

var matchers = [beach, pedestrian, surf];
exports.match = function(req, res){


  res.send("repond with a matching activity");
};