var json2csv = require('json2csv');


var CONFIG = {
        secrets: {
            clientId:     'GOJXU43XWNQME2YCUOLNG5HR2ESRUJSLHXBRGC5I4PHYVAO2',
            clientSecret: '0K1IFL1DNDG45IVCNE5LKL2JUNHFBPVJL0E00I0L35CUG5HH',
            redirectUrl:  'http://localhost:3030/callback'
        },
        foursquare: {
            version: '20130212'
        },
        // Debugging purposes.
        // log4js: {
        //     appenders : [{
        //         type : 'console'
        //     }],
        //     levels: {
        //         'node-foursquare.Venues': 'DETAIL'
        //     }
        // }
    },
    // Hard-coded access token for tomasloon@gmail.com to app "octagon"
    // TODO: use per-user token. This is just for demo purposes.
    accessToken = 'CMAN3GIK30D0YGEFJGMQ1D3PZLYSZAIXOGEDTL1RNQFZ1HCG',

    Foursquare = require('node-foursquare-2')(CONFIG),
    API = exports;


/**
 * Search through 4SQ venues
 * @type {URL}
 * @param  term  *Mandatory* term to lookup related content.
 * @param  ll    Comma separated latitude and longitud. Defaults to -38.000627,-57.545786 (Mar del Plata)
 * @param  limit Quantitiy of venues result to return. Defaults to 20. Value must be between 1 and 50.
 */
API.search = function (req, res, next) {
    // Mar del Plata: https://maps.google.com.ar/?ll=-38.000627,-57.545786&spn=0.039161,0.077162&t=h&z=14
    var lat = '-38.000627',
        lng = '-57.545786',
        ll;

    if (!req.query.term) {
        res.send(400, {
            status: 'error',
            error: '`term` is a required parameter.'
        });
        return false;
    }

    if (req.query.ll) {
        ll = req.query.ll.split(',');
        lat = ll[0];
        lng = ll[1];
    }

    // TODO: set categoryId (comma separated) to lookup for category terms such as:
    // 4bf58dd8d48988d1e2941735 = Beach
    // 4fceea171983d5d06c3e9823 = Aquarium
    // 4bf58dd8d48988d1e3941735 = surf spot
    // 4bf58dd8d48988d181941735  = museum
    // etc.
    // More info at https://developer.foursquare.com/docs/explore#req=venues%2Fcategories

    Foursquare.Venues.search(lat, lng, '', {
        limit: req.query.limit || 20,
        intent: 'browse',
        // meters
        radius: 5000,
        query: req.query.term,
        // categoryId: "4bf58dd8d48988d181941735"
    }, accessToken, function (error, data) {
        if (error) {
            res.send(503, {
                status: 'error',
                error: error
            });
        } else {
            data.status = 'ok';

            var result = [];
            for (var i = 0; i < data.venues.length; i++) {
                var sqPoint = data.venues[i];
                var point ={};
                point.name = sqPoint.name;
                point.lat= sqPoint.location.lat;
                point.lng=sqPoint.location.lng;
                point.distance = sqPoint.location.distance;
                point.address = sqPoint.location.address;
                if (sqPoint.categories.length > 0 ){
                    point.category = processCategory(sqPoint.categories[0].name);
                    point.originalcategory = sqPoint.categories[0].name;
                }
                else {
                        point.category = "";
                        point.originalcategory = "";

                }
                result.push(point);
            };
            // json2csv({data: result,
            //         fields: ['name', 'lat', 'lng','distance','address', 'category', 'originalcategory']},
            //         function(err, csv) {
            //             res.write(csv);
            //             res.end();
            // });

            res.send(200, result);
        }
    });
};

function processCategory(category){
    var result = "";
    var category = category.toLowerCase();
    if(category.indexOf('surf') > -1){
        result = "surf";
    }
    else if (category.indexOf('beach') > -1){
        result = "playa";
    }
    else if (category.indexOf('museum') > -1){
        result = "museo";
    }
    else if (category.indexOf('art') > -1){
        result = "museo";
    }
    return result;

}