// /api/v1/actividades/{profile}
var csvjs = require('csv-json');
var places = require('../../datasets/places.js')
exports.all = function(req, res){
    // csvjs.parseCsv('./datasets/mdq.4sq.csv', function(error, json, stats){
        res.json(places.places);
        res.end();
    // });
};

exports.search = function(req, res){
    var name = req.params.name ? req.params.name : "Playa";
    var result =[];
    for (var i = 0; i < places.places.length; i++) {
        var place =places.places[i];
        if (place.category.toLowerCase() === name.toLowerCase()){
            result.push(place);
        }
    };
    res.json(result);
    res.end();

};