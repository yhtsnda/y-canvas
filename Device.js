//var device = {};
// domReady(function () {
//     device.resolution = SizeMake(document.body.clientWidth, document.body.clientHeight);
//     var dom = document.createElement('canvas');
//     dom.id = 'app';
//     document.body.appendChild(dom);
//     addEventHandler(window, 'resize', function (e) {
//         device.resolution.reset(document.body.clientWidth, document.body.clientHeight);
//     });
// });

function disablePageMove(){
    addEventHandler(document,'touchstart',function(e){
        e.preventDefault();
        return false;
    });
    addEventHandler(document,'touchmove',function(e){
        e.preventDefault();
        return false;
    });
    addEventHandler(document,'touchend',function(e){
        e.preventDefault();
        return false;
    });
}