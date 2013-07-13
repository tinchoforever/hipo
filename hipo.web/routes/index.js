
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Hipo - Que queres hacer en Mar Del Plata?' });
};