function main(){
	start(function(dom) {
	        var app = new Application(dom);

	        var scene = new Scene;
	        var layer = new Layer;
		ImageEngine.load('images/home-mask.png', function() {
	        var sprite = new Sprite;
	        sprite.images().push({
	        	img: 'images/home-mask.png'
	        });
	        sprite.onUpdate = function(){
	        	this.rotate(this.rotate() + 0.01);
	        };
	        //sprite.anchor().reset(0.5,0.5);
	        sprite.scale().reset(0.5,0.5);
	        sprite.width(640);
	        sprite.height(183);
	        sprite.position().reset(0,0);
	        layer.addChild(sprite);
	    });
	    app.addChild(scene.addChild(layer)).run();
    });
}
domReady(function() {
    main();
});