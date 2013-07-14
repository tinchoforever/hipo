
exports.match = function(profile, callback){
	var staticInfo = {};
	staticInfo.percentMatch = 0.9;
    
	var matchingrule = [
	                    {'condition' : 'wind', 'less': 35},
	                    {'condition' : 'condition', 'not': 'rain'},
	                    {'condition' : 'temp', 'greater' : 10}
	                   ];
	var matching = 1;
	for (currentRule in matchingrule) {
		var rule = matchingrule[currentRule];
		if (! rule.condition) {
			continue;
		}
		if (rule.condition === 'wind') {
			var compare = profile.weather.wind.speed;
		}
		if (rule.condition === 'condition') {
			var compare = profile.weather.condition;
		}
		if (rule.condition === 'monthOfYear') {
			var compare = profile.month;
		}
		if (rule.condition === 'temp') {
			var compare = profile.weather.temp;
		}

		//comparator
		if (rule.less) {
			if (rule.less < compare) {
				matching *= staticInfo.percentMatch;
			}
		}
		if (rule.greater) {
			if (rule.greater > compare) {				
				matching *= staticInfo.percentMatch;
			}
		}
		if (rule.not) {
			if (rule.condition !== compare) {
				matching *= (staticInfo.percentMatch / 2);
			}
		}
		if (rule.is) {
			if (rule.condition === compare) {
				matching *= (staticInfo.percentMatch / 2);
			}
		}
	}

	console.log('adding walking places');
	var suggestions = [{matching: matching, place : 'Museo'}];
	callback(suggestions);

};