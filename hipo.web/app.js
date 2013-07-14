
/**
 * Module dependencies.
 */

var express     = require('express')
  , http        = require('http')
  , path        = require('path');


var
    index           = require('./routes/controllers/index.js')
  , activities      = require('./routes/api/activities')
  , suggestions     = require('./routes/api/suggestions')
  , places          = require('./routes/api/places')
  , hipo            = require('./service/hipo');


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

app.get('/', index.home);

app.get('/api/v1/activities/all', activities.all);

app.get('/api/v1/suggestions', suggestions.detail);
app.get('/api/v1/suggestions/:name?', suggestions.detail);

app.post('/api/v2/suggestions', suggestions.forUser);
app.post('/api/v2/suggestions/:name?', suggestions.forKeyandUser);

app.get('/api/v1/places/all', places.all);
app.get('/api/v1/places/search/:name?', places.search);
app.post('/api/v1/places/all', places.all);
app.post('/api/v1/places/search/:name?', places.search);

app.post('/api/v1/start', hipo.match)
app.post('/api/v1/start/:name?', hipo.match)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
