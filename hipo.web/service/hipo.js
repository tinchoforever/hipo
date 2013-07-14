var beach       = require('./matchers/beach')
  , pedestrian  = require('./matchers/pedestrian')
  , surf        = require('./matchers/surf')
  , array       = require ('array-extended')
  , mocks       = require('../datasets/mocks.js')
  , curly       = require('curly')
  , async       = require('async');


var matchers = [beach, pedestrian, surf];
var weatherResult;
exports.match = function(req, res) {

	var user = req.body;
  console.log(user.name);
  console.log(user.tags);
  console.log(user.mobility);
  console.log(user.date);


  var profile = {};
	profile.user = user;

  profile.month = 11;

  //TODO: Get Weather

  profile.weather = {};
  
  
  async.series([function(callback) {
      curly.get('https://api.forecast.io/forecast/3dc9db43b756c31a297a159fdb38b4d3/-37.9798584,-57.5897', function(err, response, body){
        weatherResult = response.body.currently;
        console.log("weatherResultweatherResultweatherResult", weatherResult);
        callback();
      });
    }], function(err) { 
      if (err) return next(err);
      //Here locals will be populated with 'user' and 'posts'
      console.log("weatherResult", weatherResult);
  });

  console.log("weatherResult2", weatherResult);
  
	
	profile.weather.condition = 'rain';
	profile.weather.wind = {};
	profile.weather.temp = 13;
	profile.weather.wind.speed = 1;

	var activities = [];
	for ( matcher in matchers) {
		matchers[matcher].match(profile, function(records) {
			for (record in records) {
				activities.push(records[record]);
			}
		});
	}



  var sorted = array.sort(activities, "matching");
  var current = sorted[0];



  //TODO: PARSE PARAMS FOR CURRENT ACTIVITY
  var parameters = mocks.params;

  var activitySuggestion = {
      name: current.place,
      matching: current.matching,
      weather: profile.weather,
      parameters: parameters,
  };

  res.json(activitySuggestion, 200);
};

var getCurrentWeather = function(callback) {
  
};
