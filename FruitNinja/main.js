function FruitNinja() {
    var dom = document.getElementById('app');
    dom.width = 640; //device.resolution.w;
    dom.height = 480; //device.resolution.h;
    var app = new Application(dom);
    
    var gameStateManager = (function () {
        var scenes = app.currentScene(),
        states = {
            'loading' : function () {
                scenes.empty().push(LoadingScene());
            },
            'introduce' : function () {
                scenes.empty().push(StartScene());
            },
            'game' : function () {
                scenes.empty().push(GameScene());
            },
            'gameover' : function () {
                scenes.empty().push(GameoverScene());
            }
        };
        return {
            changeState : function (state) {
                states[state] && states[state]();
            }
        }
    })();
    gameStateManager.changeState('loading');
    MessageCenter.onSubscribe('loadingDone', function () {
        gameStateManager.changeState('introduce');
    }).onSubscribe('fruit', function () {
        gameStateManager.changeState('introduce');
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
            pattern = pattern || ctx.createPattern(img, "repeat");
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
    return new Scene().addChild(new Layer).addChild(progressBar);
}

function StartScene() {
    var bg = new Sprite,
        knife = new Knife,
        indrag;
    bg.images().push({
        img : 'FruitNinja/images/background.jpg'
    });
    var layer = new Layer().addChild(new Layer).addChild(knife).addChild(bg);
    layer.onmousedown.push(function(e){
        //console.log(e.position);
        indrag = true;
        knife.parts = knife.parts || [];
        knife.parts.push({
            x: e.position.x,
            y: e.position.y,
            life: 15
        });
    });
    layer.onmousemove.push(function(e){
        //console.log(e.position);
        if(!indrag){
            return;
        }
        knife.parts = knife.parts || [];
        knife.parts.push({
            x: e.position.x,
            y: e.position.y,
            life: 15
        });
    });
    layer.onmouseup.push(function(e){
        //console.log(e.position);
        indrag = false;
        knife.parts = [];
    });
    return new Scene().addChild(layer);
}

function GameScene() {}

function Knife() {
    var knife = new Sprite;
    knife.draw = function (ctx) {
        if (this.parts && this.parts.length > 1) {
            ctx.beginPath();
            for (var d = this.parts.length - 1; d >= 0; d--) {
                this.parts[d].life--;
                if(d === this.parts.length - 1){
                    continue;
                }
                var from = this.parts[d + 1],
                    to = this.parts[d];
                if (from.life > 0) {
                    ctx.lineWidth = 12 * to.life / 15;
                    ctx.strokeStyle = "red";
                    ctx.moveTo(from.x, from.y);
                    ctx.lineTo(to.x, to.y);
                    ctx.stroke();
                    
                    ctx.lineWidth = 10 * to.life / 15;
                    ctx.strokeStyle = "#FFFFFF";
                    ctx.moveTo(from.x, from.y);
                    ctx.lineTo(to.x, to.y);
                    ctx.stroke();
                } else {
                    this.parts.splice(d, 1);
                }
            }
            ctx.closePath();
        }
    };
    return knife;
}

function Fruit() {}
domReady(function () {
    FruitNinja();
});
