var yqlWeather = require('../lib/YQLWeather').yqlweather;
var should = require('should');

var yokohama = 'JAXX0099';
var tokyo = 'JAXX0085';

console.log(yqlWeather);
describe('横浜の都市が取れるかどうか', function() {
    it('横浜の都市が取れること', function(done) {
        yqlWeather.executeQuery(yokohama, function(response){
            var channel = response.query.results.channel;
            'Yokohama'.should.equal(channel.location.city);
            done();
        });
    });
});

describe('東京の都市が取れるかどうか', function() {
    it('東京の都市が取れること', function(done) {
        yqlWeather.executeQuery(tokyo, function(response){
            var channel = response.query.results.channel;
            'Tokyo'.should.equal(channel.location.city);
            done();
        });
    });
});


