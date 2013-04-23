function Node() {
    this.position = function () {
        var pos = PointMake(0, 0);
        return function (position) {
            return position === undefined ? pos : pos = position;
        }
    }();
    this.actualPosition = function(){
        return this.position();
    };
    this.size = function () {
        var _size = PointMake(0, 0);
        return function (size) {
            return size === undefined ? _size : _size = size;
        }
    }();
    this.visible = function () {
        var _visible = true;
        return function (visible) {
            return visible === undefined ? _visible : _visible = visible;
        }
    }();
    this.images = function () {
        var _images = [];
        return function (images) {
            return images === undefined ? _images : _images = images;
        }
    }();
    this.imageIndex = function(){
        var _index = 0;
        return function(index){
            return index === undefined ? _index : _index = index;
        }
    };
    this.getImage = function(){
        return this.images[this.imageIndex()];
    };
    this.zIndex = function () {
        var _index = 0;
        return function (index) {
            return index === undefined ? _index : _index = index;
        }
    }();
    this.aplha = function(){
        var _alpha = 0;
        return function(alpha){
            return alpha === undefined ? _alpha : _alpha = alpha;
        }
    }();
    this.anchor = function () {
        var _anchor = PointMake(0.5, 0.5);
        return function (anchor) {
            return anchor === undefined ? _anchor : _anchor = anchor;
        }
    }();
    this.rotate = function () {
        var _rotate = 0;
        return function (rotate) {
            return rotate === undefined ? _rotate : _rotate = rotate;
        }
    }();
    this.scale = function () {
        var _scale = PointMake(1, 1);
        return function (scale) {
            return scale === undefined ? _scale : _scale = scale;
        }
    }();
    this.skew = function () {
        var _skew = PointMake(1, 1);
        return function (skew) {
            return skew === undefined ? _skew : _skew = skew;
        }
    }();
    this.transform = function () {
        var _transform = null;
        return function (transform) {
            return transform === undefined ? _transform : _transform = transform;
        }
    }();
    this.pause = function () {
        var _paused;
        return function (paused) {
            return paused === undefined ? _paused : _paused = paused;
        }
    }();
    this.stop = function () {
        this.pause(true);
    };
    this.resume = function () {
        this.pause(false);
    };
    this.children = function () {
        var _children = [];
        return function (children) {
            return children === undefined ? _children : _children = children;
        }
    }();
    this.width = function(){
        var _width = 0;
        return function(width){
            return width === undefined ? _width : _width = width;
        }
    }();
    this.height = function(){
        var _height = 0;
        return function(height){
            return height === undefined ? _height : _height = height;
        }
    }();
    exec(this, 'init', arguments);
}