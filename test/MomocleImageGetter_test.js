var momocloImageGetter = require('../lib/MomocloImageGetter').momocloImageGetter;
var should = require('should');

var reni = 'reni';

var arling = 'arling';

var siorin = 'siorin';

var kanako = 'kanako';

var momoka = 'momoka';

describe('れにちゃん画像', function() {
    it('雨のれにちゃん', function() {
        var rainy_reni = momocloImageGetter.getMemberImage(reni, 1);

        'rainy_reni.png'.should.equal(rainy_reni);

        rainy_reni = momocloImageGetter.getMemberImage(reni, 2);

        'rainy_reni.png'.should.equal(rainy_reni);

        rainy_reni = momocloImageGetter.getMemberImage(reni, 3);

        'rainy_reni.png'.should.equal(rainy_reni);

        rainy_reni = momocloImageGetter.getMemberImage(reni, 47);

        'rainy_reni.png'.should.equal(rainy_reni);



    });

    it('曇のれにちゃん', function() {
        var cloudy_reni = momocloImageGetter.getMemberImage(reni, 19);

        'cloudy_reni.png'.should.equal(cloudy_reni);
        
        cloudy_reni = momocloImageGetter.getMemberImage(reni, 28);

        'cloudy_reni.png'.should.equal(cloudy_reni);

    });
    
    it('晴れのれにちゃん', function() {
        var sunny_reni = momocloImageGetter.getMemberImage(reni, 29);

        'sunny_reni.png'.should.equal(sunny_reni);
        
        sunny_reni = momocloImageGetter.getMemberImage(reni, 44);

        'sunny_reni.png'.should.equal(sunny_reni);

    });

});



