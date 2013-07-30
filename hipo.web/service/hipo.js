var beach       = require('./matchers/beach')
  , pedestrian  = require('./matchers/pedestrian')
  , surf        = require('./matchers/surf')
  , array       = require ('array-extended')
  , mocks       = require('../datasets/mocks.js')
  , curly       = require('curly');

var matchers = [beach, pedestrian, surf];
exports.match = function(req, res) {

	var user = req.body;
  console.log(user.name);
  console.log(user.tags);
  console.log(user.mobility);
  console.log(user.date);


  var profile = {};
	profile.user = user;


  profile.month = new Date().getMonth();


  profile.weather = {};

  curly.get('https://api.forecast.io/forecast/3dc9db43b756c31a297a159fdb38b4d3/-37.9798584,-57.5897', function(err, response, body){
    weatherResult = (JSON.parse(response.body)).currently;

    profile.weather.condition = weatherResult.summary;
    profile.weather.precipitation = weatherResult.precipProbability;
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
        name: "humedad",
        parsed: ["hu", "me", "dad"],
        value: Math.ceil(weatherResult.humidity * 100),
        uom: {name: "porcentaje", symbol: "%"}
    });

    parameters.push({
        name: "bandera mar",
        parsed: ["ban", "dera", "mar"],
        value: "A",
        uom: {name: "bandera", symbol: "B"}
    });


    var precipitaciones = processPorcentage(profile.weather.precipitation);
    parameters.push({
        name: "va a llover hoy?",
        parsed: ["llu", "via", "hoy",],
         value: precipitaciones,
        uom: {name: "porcentaje", symbol: " "}
    });



    var activitySuggestion = {
        name: req.params.name ? req.params.name : current.place,
        matching: current.matching,
        weather: profile.weather,
        parameters: parameters,
        condition: profile.weather.condition
    };

    res.json(activitySuggestion, 200);

  });
};
function processPorcentage(p){

  if (p < 25){
    return "NO";
  }
  else if (p >= 80 ){
    return "SI";
  }else {
    return "TAL VEZ";
  }

}
