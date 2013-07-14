var beach       = require('./matchers/beach')
  , pedestrian  = require('./matchers/pedestrian')
  , surf        = require('./matchers/surf')
  , array       = require ('array-extended');;

var matchers = [beach, pedestrian, surf];
exports.match = function(req, res) {
	var userprofile = req.params.profile;
	var profile = {};
	profile.user = userprofile;
	profile.weather = {};
	profile.month = 1;
	profile.weather.condition = 'rain';
	profile.weather.wind = {};
	profile.weather.temp = 30;
	profile.weather.wind.speed = 5;

	var activities = [];
	for ( matcher in matchers) {
		matchers[matcher].match(profile, function(records) {
			for (record in records) {
				activities.push(records[record]);				
			}
		});
	}
	//return activities
	var sorted = array.sort(activities, "matching");
  
    res.json(sorted, 200);
  //res.send("repond with a matching activity" + activities);
};