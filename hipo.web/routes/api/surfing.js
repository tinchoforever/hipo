

exports.all = function(req, res){

    var name = req.params.name ? req.params.name : "Playa";
    curly.get('http://elsurfero.com/elsurfero/pages/rep_todos.asp?gru=5&npa=REPORTES', function(err, response, body){

        res.json(activitySuggestion);
        console.log(body);
        res.end();

    });

};