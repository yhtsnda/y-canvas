function Node(){
	this.position = (function(){
		var pos = PointMake(0,0);
		return function(position){
			return position == null ? pos : (pos = position);
		}
	})();
	this.size = (function(){
		var _size = SizeMake(0,0);
		return function(size){
			return size == null ? _size : _size = size;
		};
	})();
	this.visible = (function(){
		var _visible = true;
		return function(visible){
			return visible == null ? _visible : _visible = visible;
		}
	})();
	this.images = (function(){
		var _images = [];
		return function(images){
			return images == null ? _images : _images = images;
		}
	})();
	this.imageIndex:0;
	this.zindex = (function(){
		var _index = 0;
		return function(index){
			return index == null ? _index : _index = index;
		}
	});
	this.anchor = (function(){
		var _anchor = PointMake(0.5,0.5);
		return function(anchor){
			return anchor == null ? _anchor : _anchor = anchor;
		};
	})();
	this.rotate = (function(){
		var _rotate = 0;
		return function(rotate){
			return rotate == null ? _rotate : _rotate = rotate;
		};
	})();
	this.scaleX = (function(){
		var _scaleX = 1;
		return function(scaleX){
			return scaleX == null ? _scaleX : _scaleX = scaleX;
		};
	})();
	this.scaleY = (function(){
		var _scaleY = 1;
		return function(scaleY){
			return scaleY == null ? _scaleY : _scaleY = scaleY;
		};
	})();
	this.skewX = (function(){
		var _skewX = 0;
		return function(skewX){
			return skewX == null ? _skewX : _skewX = skewX;
		};
	})();
	this.skewY = (function(){
		var _skewY = 0;
		return function(skewY){
			return skewY == null ? _skewY : _skewY = skewY;
		};
	})();
	this.transform = (function(){
		var _transform = null;
		return function(transform){
			return transform == null ? _transform : _transform = transform;
		};
	})();
}
