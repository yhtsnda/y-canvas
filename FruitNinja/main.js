function FruitNinja() {
    var dom = document.getElementById('app');
    dom.width = 640;//device.resolution.w;
    dom.height = 480;//device.resolution.h;
    var app = new Application(dom);
    
    var gameStateManager = (function () {
        var states = {
            'loading' : function () {
                app.currentScene = LoadingScene();
            },
            'introduce' : function () {
                app.currentScene = StartScene();
            },
            'game' : function () {
                app.currentScene = GameScene();
            },
            'gameover' : function () {
                app.currentScene = GameoverScene();
            }
        };
        return {
            changeState : function(state) {
                states[state] && states[state]();
            }
        }
    })();
    gameStateManager.changeState('loading');
    MessageCenter.onSubscribe('loadingDone',function(){
        gameStateManager.changeState('introduce');
        //app.currentScene = StartScene();
    }).onSubscribe('fruit',function(){
        gameStateManager.changeState('introduce');
        //app.currentScene = GameScene();
    });
    app.run();
}

function LoadingScene() {
    var progressBar = new Sprite;
        imgs = "images/background.jpg images/fruit/apple.png images/fruit/apple-1.png images/fruit/apple-2.png images/fruit/banana.png images/fruit/banana-1.png images/fruit/banana-2.png images/fruit/basaha.png images/fruit/basaha-1.png images/fruit/basaha-2.png images/fruit/peach.png images/fruit/peach-1.png images/fruit/peach-2.png images/fruit/sandia.png images/fruit/sandia-1.png images/fruit/sandia-2.png images/fruit/boom.png images/shadow.png images/home-mask.png images/logo.png images/ninja.png images/home-desc.png images/dojo.png images/new-game.png images/quit.png images/new.png images/score.png images/xxx.png images/xxxf.png images/game-over.png".split(" "),
        audios = "sounds/boom sounds/splatter sounds/menu sounds/throw sounds/over".split(" ");
    progressBar.len = imgs.length + audios.length;
    progressBar.subscribe('loaded', function () {
        this.loaded = this.loaded || 0;
        if (++this.loaded === progressBar.len) {
            this.publish('loadingDone');
        };
    });
    ImageEngine.loadImage('FruitNinja/images/progress_orange.gif', function () {
        var pattern,
            img = this;
        progressBar.draw = function (ctx) {
            pattern =  pattern || ctx.createPattern(img, "repeat");
            ctx.fillStyle = pattern;
            ctx.fillRect(70, 230, 500 * Math.min(progressBar.loaded / progressBar.len, 1), img.height);
            ctx.strokeStyle = "#eee";
            ctx.rect(70, 230, 500, img.height);
            ctx.stroke();
        };
    });
    imgs.some(function (url) {
        ImageEngine.loadImage('FruitNinja/' + url, function () {
            BaseObject.prototype.publish('loaded');
        });
    });
    audios.some(function (url) {
        AudioEngine.loadAudio('FruitNinja/' + url, function () {
            BaseObject.prototype.publish('loaded');
        });
    });
    return (new Scene).addChild((new Layer).addChild(progressBar));
}

function StartScene() {
    var scene = new Scene,
        layer = new Layer,
        sprite = new Sprite;
    var bg = new Sprite();
    bg.images().push({img:'images/background.jpg'});
    return scene.addChild(layer.addChild(sprite));
}

function GameScene() {}

function Knife() {}

function Fruit() {}
domReady(function () {
    FruitNinja();
});
