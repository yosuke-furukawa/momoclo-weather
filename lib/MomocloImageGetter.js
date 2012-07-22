//0	tornado
//1	tropical storm
//2	hurricane
//3	severe thunderstorms
//4	thunderstorms
//5	mixed rain and snow
//6	mixed rain and sleet
//7	mixed snow and sleet
//8	freezing drizzle
//9	drizzle
//10	freezing rain
//11	showers
//12	showers
//13	snow flurries
//14	light snow showers
//15	blowing snow
//16	snow
//17	hail
//18	sleet
//19	dust
//20	foggy
//21	haze
//22	smoky
//23	blustery
//24	windy
//25	cold
//26	cloudy
//27	mostly cloudy (night)
//28	mostly cloudy (day)
//29	partly cloudy (night)
//30	partly cloudy (day)
//31	clear (night)
//32	sunny
//33	fair (night)
//34	fair (day)
//35	mixed rain and hail
//36	hot
//37	isolated thunderstorms
//38	scattered thunderstorms
//39	scattered thunderstorms
//40	scattered showers
//41	heavy snow
//42	scattered snow showers
//43	heavy snow
//44	partly cloudy
//45	thundershowers
//46	snow showers
//47	isolated thundershowers
//3200	not available
var RAINY_SNOWY_WEATHER_CODES = 
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
     35, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47];
var CLOUDY_WEATHER_CODES = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
var SUNNY_WEATHER_CODES = [29, 30, 31, 32, 33, 34, 36, 44];

function MomocloImageGetter(){}

var momocloImageGetter = new MomocloImageGetter();
MomocloImageGetter.prototype.getMemberImage = function(memberName, code) {
    code = Number(code);
    var imagename = '';
    if (SUNNY_WEATHER_CODES.indexOf(code)>=0) {
        imagename = 'sunny_' + memberName + '.png';
    } else if (CLOUDY_WEATHER_CODES.indexOf(code)>=0) {
        imagename = 'cloudy_' + memberName + '.png';
    } else if (RAINY_SNOWY_WEATHER_CODES.indexOf(code)>=0) {
        imagename = 'rainy_' + memberName + '.png';
    } else {
        imagename = 'sunny_'+'momoclo.png';
    }
    return imagename;
};

exports.momocloImageGetter = momocloImageGetter;

