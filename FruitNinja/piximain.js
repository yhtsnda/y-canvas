// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(400, 300);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

requestAnimFrame(animate);


// create a texture from an image path
var texture = PIXI.Texture.fromImage("boom.png");
// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprites anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite t the center of the screen
bunny.position.x = 200;
bunny.position.y = 150;

stage.addChild(bunny);
//texture = PIXI.Texture.fromImage("images/logo.png");
//var logo = new PIXI.Sprite(texture);
//stage.addChild(logo);
function animate() {

	bunny.rotation += 0.01;
	//logo.rotation -= 0.01;
	// render the stage   
	renderer.render(stage);
	requestAnimFrame(animate);
}