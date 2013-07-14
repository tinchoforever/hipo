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
  
  //TODO store this on db
  
  curly.get('https://api.forecast.io/forecast/3dc9db43b756c31a297a159fdb38b4d3/-37.9798584,-57.5897', function(err, response, body){
    weatherResult = (JSON.parse(response.body)).currently;  
  
    profile.weather.condition = weatherResult.summary;
    profile.weather.wind = {};
    profile.weather.icon = weatherResult.icon;
    profile.weather.temp = (weatherResult.temperature - 32)/ 1.8; // from Farenheit to celcius
    profile.weather.wind.speed = weatherResult.windSpeed;

    console.log(profile.weather);

    var activities = [];
    for ( matcher in matchers) {
      matchers[matcher].match(profile, function(records) {
        for (record in records) {
          activities.push(records[record]);
        }
      });
    }

    var sorted = array.sort(activities, "matching");
    console.log(sorted);
    var current = sorted[2];

    //TODO: PARSE PARAMS FOR CURRENT ACTIVITY
    var parameters = [];
    parameters.push({
        name: "temperatura",
        parsed: ["tem", "pera", "tura"],
        value: Math.ceil(profile.weather.temp),
        uom: {name: "grados", symbol: "˚"}
    });

    parameters.push({
        name: "tabla marea",
        parsed: ["tabla", "mar", "eas"],
           value: Math.ceil((Math.random()*10)+1),
        uom: {name: "metros", symbol: "m"}
    });

    parameters.push({
        name: "bandera mar",
        parsed: ["ban", "dera", "mar"],
        value: "A",
        uom: {name: "bandera", symbol: "B"}
    });

    parameters.push({
        name: "medusas",
        parsed: ["me", "du", "sas"],
         value: Math.ceil((Math.random()*100)+1),
        uom: {name: "porcentaje", symbol: "%"}
    });
       

    var activitySuggestion = {
        name: current.place,
        matching: current.matching,
        weather: profile.weather,
        parameters: parameters,
    };

    res.json(activitySuggestion, 200);
  });
 
  
};
