
var mocks = require('../../datasets/mocks.js');

exports.forKeyandUser = function(req, res){

    var name = req.params.name ? req.params.name : "Playa";
    //User Params
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.tags);
    console.log(req.body.mobility);
    console.log(req.body.date);

    var parameters = mocks.params;


    var activitySuggestion = {
        name: name,
        weather: "nublado",
        parameters: parameters,
    };

    res.json(activitySuggestion);
    res.end();

};

exports.forUser = function(req, res){

    var name = req.params.name ? req.params.name : "Playa";
    //User Params
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.tags);
    console.log(req.body.mobility);
    console.log(req.body.date);

    var parameters = mocks.params;


    var activitySuggestion = {
        name: name,
        weather: "nublado",
        parameters: parameters,
    };

    res.json(activitySuggestion);
    res.end();

};


exports.detail = function(req, res){

    var name = req.params.name ? req.params.name : "Playa";

    var parameters = mocks.params;


    var activitySuggestion = {
        name: name,
        weather: "nublado",
        parameters: parameters,
    };

    res.json(activitySuggestion);
    res.end();

};