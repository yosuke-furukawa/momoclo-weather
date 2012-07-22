var yql = require('yql');

function YQLWeather(){}

function validate(area, response) {
    var result = response;
    if (!response.query) {
        result = "No such area: " + area;
    }


    if (!response.query.results) {
        result = "No such area: " + area;
    }

    if (!response.query.results.channel) {
        result = "No such area: " + area;
    }
    if (!response.query.results.channel.item) {
        result = "No Item: " + area;
    }
    if (!response.query.results.channel.item.forecast) {
        result = response.query.results.channel.item.title;
    }
    return result;
}

//Tokyo : JAXX0085
//Yokohama : JAXX0099
//単位はCelcius固定。Fahrenheitがいいって人がいたら、f。
YQLWeather.prototype.executeQuery = function(area, callback) {
    yql.exec("SELECT * FROM weather.forecast WHERE location=@area AND u=@unit", function(response) {
        var validated_res = validate(area, response);
        callback(validated_res);
    }, {'area':area, 'unit':'c'});
};


var yqlweather = new YQLWeather();

exports.yqlweather = yqlweather;
