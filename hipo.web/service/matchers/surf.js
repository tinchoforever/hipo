exports.match = function(profile, callback){
	var matchingrule = [
	                    {'condition' : 'wind', 'greater' : 5, 'less': 30},
	                    {'condition' : 'dateOfYear', 'greater' : 20, 'less' : 10},
	                   ];
	console.log('adding surf places');
	var suggestions = [{matching: 5, place : 'surf'}];
	callback(suggestions);

};