// /api/v1/actividades/{profile}
var csvjs = require('csv-json');
exports.all = function(req, res){
    csvjs.parseCsv('./datasets/activities.csv', function(error, json, stats){
        res.json(json);
        res.end();
    });
};