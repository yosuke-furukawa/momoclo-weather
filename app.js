
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, http = require('http')
, yqlWeather = require('./lib/YQLWeather').yqlweather
, momocloImageGetter = require('./lib/MomocloImageGetter').momocloImageGetter;

var now = 'now';
var today = 'today';
var tomorrow = 'tomorrow';

var momocloMembers = ['ayaka', 'kanako', 'reni', 'momoka', 'shiori'];

var url_prefix = (process.env.NODE_ENV === 'production') ? 'http://momoclo-weather.herokuapp.com' : 'http://localhost:3000';

var images = '/images';

var app = express();

function validate(member) {
    if (momocloMembers.indexOf(member) < 0) {
        return false;
    }
    return true;
}

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

function getCode(day, channel) {
    var code;
    if (day == today) {
        code = channel.item.forecast[0].code;
    } else if (day == tomorrow) {
        code = channel.item.forecast[1].code;
    } else {
        code = channel.item.condition.code;
    }
    return code;
}

app.get('/', function(req, res){
    yqlWeather.executeQuery('JAXX0085', function(weatherResult) {
        if (!weatherResult.query) {
            res.json(weatherResult);
            return;
        }
        var channel = weatherResult.query.results.channel;
        var code = getCode('now', channel);
        var num = Math.floor(Math.random()*5);
        var member = momocloMembers[num];
        var imageFile = momocloImageGetter.getMemberImage(member, code);
        var imageURL = url_prefix + images + '/' + imageFile;
        res.render(
            'index',
            { title: 'momoclo-weather',
                text: channel.item.condition.text,
                temp: channel.item.condition.temp,
                imageUrl: imageURL}); 
    });

});


function createJson(day, channel, imageURL) {
    var weatherJson;
    if (day == today) {
        weatherJson = channel.item.forecast[0];
    } else if (day == tomorrow) {
        weatherJson = channel.item.forecast[1];
    } else {
        weatherJson = channel.item.condition;
    }
    weatherJson.momocloimage = imageURL;
    return weatherJson;
}

app.get('/weather.json', function(req, res){
    var member;
    var location;
    var day;
    if (req.query.member) {
        member = req.query.member;
        if (!validate(member)) {
            res.json("No Such member: " + member + " please input from the names = " + momocloMembers);
            return;
        }
    }
    if (req.query.location) {
        location = req.query.location;
    }
    if (req.query.day) {
        day = req.query.day;
    } else {
        day = now;
    }
    yqlWeather.executeQuery(location, function(weatherResult) {
        if (!weatherResult.query) {
            res.json(weatherResult);
            return;
        }
        var channel = weatherResult.query.results.channel;
        var code = getCode(day, channel);
        var imageFile = momocloImageGetter.getMemberImage(member, code);

        var imageURL = url_prefix + images + '/' + imageFile;
        res.json(createJson(day,channel,imageURL)); 
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

process.on('uncaughtException', function (err) {
    console.log('uncaughtException => ' + err);
});
