
/**
 * Module dependencies.
 */

var express     = require('express')
  , http        = require('http')
  , path        = require('path');


var routes          = require('./routes')
  , user            = require('./routes/user')
  , activities      = require('./routes/api/activities')
  , suggestions     = require('./routes/api/suggestions');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/api/v1/activities/all', activities.all);
app.get('/api/v1/suggestions/:name?', suggestions.detail);
app.post('/api/v1/suggestions/:name?', suggestions.detail);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
