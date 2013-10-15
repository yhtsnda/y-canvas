domReady(function() {
	ImageEngine.load('images/ninja.png', function() {

		start(function(dom) {
			var app = new Application(dom);
			var scene = new Scene();
			var layer = new Layer();
			var sprite = new Sprite();
			sprite.images().push({
					img: 'images/ninja.png',
					size: [10,10,60,60]
				});
			sprite.onUpdate = function(){
				this.position().x+=1;
				this.position().y+=1;
			}
			layer.addChild(sprite);
			scene.addChild(layer);
			app.addChild(scene);
			app.run();
		});
	});
});