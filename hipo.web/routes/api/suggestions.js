

exports.detail = function(req, res){

    var name = request.params.name ? request.params.name : "Playa";

    var parameters = [];
    parameters.push({
        name: "temperatura",
        value: random(-1,100),
        uom: {name: "grados", symbol: "˚"}
    });
    // parameters.push({
    //     name: "temperatura",
    //     value: "",
    //     uom: random(-1,100);
    // });

    // parameters.push({
    //     name: "temperatura",
    //     value: "",
    //     uom: random(-1,100);
    // });

    // parameters.push({
    //     name: "temperatura",
    //     value: "",
    //     uom: random(-1,100);
    // });

    var activitySuggestion = {
        name: name
        parameters: parameters,
    };
    res.json(activitySuggestion);
    res.end();

};