// Please install webshot npm package to run this scrip
// > npm install webshot -D
var webshot = require('webshot');


var URL = 'http://jabra.com',
    EXPORT_PATH = './screenshots/',
    PAGE_NAME = 'homepage',
    FORMAT = '.png';

var DEVICES = {
    'iphone5' : {
        width: 568,
        height : 320,
        userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
        + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
    },
    'iphone6' : {
        width: 667,
        height : 375,
        userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
        + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
    },
    'ipad' : {
        width: 1024,
        height : 768
    },
    'desktop' : {
        width: 1199,
        height : 768
    },
    'desktopWide' : {
        width: 1920,
        height : 1080
    }
};



makeWebshots(URL, DEVICES);

function makeWebshots(url, devices ) {

    Object.keys(devices).forEach(function(device) {

        var mobile = !(device.indexOf('desktop') > -1),
            path;

        if(mobile) {
            path = EXPORT_PATH + PAGE_NAME + '-' + device;
            makeWebshot(url, path + '-landscape' + FORMAT, new WebshotOptions(devices[device], 'landscape'));
            makeWebshot(url, path + '-portrait' + FORMAT, new WebshotOptions(devices[device], 'portrait'));

        } else {
            path = EXPORT_PATH + PAGE_NAME + '-' + device;
            makeWebshot(url, path + FORMAT, new WebshotOptions(devices[device]));
        }

    });
}

function makeWebshot(url, path, options) {
    webshot(url, path, options, function(err) {
        if (err) return console.log(err);
        console.log(path + ': OK');
    });
}


function WebshotOptions(device, orientation) {

    orientation = orientation || 'landscape';

    var width = (orientation == 'portrait') ? device.height : device.width,
        height = (orientation == 'portrait') ? device.width : device.height;

    this.screenSize = {
        width : width,
        height : height
    };

    this.shotSize = {
        width: 'window'
        , height: 'all'
    }

    this.userAgent = device.userAgent || null;
    this.renderDelay = 2000;

}