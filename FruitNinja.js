function FruitNinja() {
    var app = new Application(document.getElementById('app'));
    //app.currentScene = LoadingScene();
    
    var gameStateManager = (function () {
        //var currState = 'loading';
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
            'gameover' : function () {}
        };
        var changeState = function (state) {
            states[state] && states[state]();
        }
        return {
            changeState : changeState
        }
    })();
    gameStateManager.changeState('loading');
    app.run();
    /* MessageCenter.onSubscribe('loadingDone',function(){
    app.currentScene = StartScene();
    }).onSubscribe('loadingDone',function(){
    app.currentScene = GameScene();
    }); */
}

function LoadingScene() {
    var scene = new Scene,
    layer = new Layer,
    progressBar = new Sprite;
    imgs = "images/background.jpg images/fruit/apple.png images/fruit/apple-1.png images/fruit/apple-2.png images/fruit/banana.png images/fruit/banana-1.png images/fruit/banana-2.png images/fruit/basaha.png images/fruit/basaha-1.png images/fruit/basaha-2.png images/fruit/peach.png images/fruit/peach-1.png images/fruit/peach-2.png images/fruit/sandia.png images/fruit/sandia-1.png images/fruit/sandia-2.png images/fruit/boom.png images/shadow.png images/home-mask.png images/logo.png images/ninja.png images/home-desc.png images/dojo.png images/new-game.png images/quit.png images/new.png images/score.png images/xxx.png images/xxxf.png images/game-over.png".split(" "),
    audios = "sounds/boom sounds/splatter sounds/menu sounds/menu sounds/throw sounds/over".split(" ");
    progressBar.subscribe('loaded', function () {
        this.loaded = this.loaded || 0;
        if (++this.loaded === imgs.length + audios.length) {
            this.publish('loadingDone');
        };
    });
    imgs.some(function (url) {
        ImageEngine.loadImage(url, function () {
            BaseObject.prototype.publish('loaded');
        });
    });
    audios.some(function (url) {
        AudioEngine.loadAudio(url, function () {
            BaseObject.prototype.publish('loaded');
        });
    });
    return scene;
}
function StartScene() {}

function GameScene() {}

function Knife() {}

function Fruit() {}
domReady(function () {
    FruitNinja();
});
