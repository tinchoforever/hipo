var parameters = [];
parameters.push({
        name: "temperatura",
        parsed: ["tem", "pera", "tura"],
        value: Math.ceil((Math.random()*10)+1),
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


exports.params = parameters;