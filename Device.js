var device = {};
var start = function(callback) {
    domReady(function() {
        device.resolution = PointMake(640,480);//PointMake(document.body.clientWidth, document.body.clientHeight);
        var dom = document.createElement('canvas');
        dom.id = 'app';
        document.body.appendChild(dom);
        dom.width = device.resolution.x;
        dom.height = device.resolution.y;
        callback && callback(dom);
        /*
        var resizeTimeout;
        addEventHandler(window, 'resize', function(e) {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                device.resolution.reset(document.body.clientWidth, document.body.clientHeight);
                dom.width = device.resolution.x;
                dom.height = device.resolution.y;
            },200);
        });
    */
    });
}

    function disablePageMove() {
        addEventHandler(document, 'touchstart', function(e) {
            e.preventDefault();
            return false;
        });
        addEventHandler(document, 'touchmove', function(e) {
            e.preventDefault();
            return false;
        });
        addEventHandler(document, 'touchend', function(e) {
            e.preventDefault();
            return false;
        });
    }