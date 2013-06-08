var asserts = {
    bg: {
        images: [{
                img: 'FruitNinja/images/background.jpg'
            }
        ]
    },
    logo: {
        images: [{
                img: 'FruitNinja/images/logo.png'
            }
        ],
        position: PointMake(20, 0)
    },
    mask: {
        images: [{
                img: 'FruitNinja/images/home-mask.png'
            }
        ],
        position: PointMake(0, -200)
    },
    ninja: {
        images: [{
                img: 'FruitNinja/images/ninja.png'
            }
        ],
        position: PointMake(340, -81),
        width: 244,
        height: 81
    },
    desc: {
        images: [{
                img: 'FruitNinja/images/home-desc.png'
            }
        ],
        position: PointMake(-200, 130)
    },
    dojo: {
        images: [{
                img: 'FruitNinja/images/dojo.png'
            }
        ],
        position: PointMake(30, 250),
        width: 175,
        height: 175,
        scale: PointMake(0, 0)
    },
    startpeach: {
        images: [{
                img: 'FruitNinja/images/fruit/peach.png'
            }
        ],
        position: PointMake(86, 308),
        width: 62,
        height: 59,
        scale: PointMake(0, 0)
    },
    game: {
        images: [{
                img: 'FruitNinja/images/new-game.png'
            }
        ],
        width: 195,
        height: 195,
        position: PointMake(230, 240),
        scale: PointMake(0, 0)
    },
    startsandia: {
        images: [{
                img: 'FruitNinja/images/fruit/sandia.png'
            }
        ],
        width: 98,
        height: 85,
        position: PointMake(278, 295),
        scale: PointMake(0, 0)
    },
    quit: {
        images: [{
                img: 'FruitNinja/images/quit.png'
            }
        ],
        width: 141,
        height: 141,
        position: PointMake(480, 300),
        scale: PointMake(0, 0)
    },
    startboom: {
        images: [{
                img: 'FruitNinja/images/fruit/boom.png'
            }
        ],
        width: 66,
        height: 68,
        position: PointMake(517, 337),
        scale: PointMake(0, 0)
    }
};

function FruitNinja() {
    var dom = document.getElementById('app');
    dom.width = 640; //device.resolution.w;
    dom.height = 480; //device.resolution.h;
    var app = new Application(dom);

    var gameStateManager = (function() {
        var scenes = app.currentScene(),
            states = {
                'loading': function() {
                    scenes.empty().push(LoadingScene());
                },
                'introduce': function() {
                    scenes.empty().push(StartScene());
                },
                'game': function() {
                    scenes.empty().push(GameScene());
                },
                'gameover': function() {
                    scenes.empty().push(GameoverScene());
                }
            };
        return {
            changeState: function(state) {
                states[state] && states[state]();
            }
        }
    })();
    gameStateManager.changeState('loading');
    MessageCenter.onSubscribe('loadingDone', function() {
        gameStateManager.changeState('introduce');
    }).onSubscribe('fruit', function() {
        gameStateManager.changeState('introduce');
    });
    app.run();
}

function LoadingScene() {
    var progressBar = new Sprite,
        imgs = "images/background.jpg images/fruit/apple.png images/fruit/apple-1.png images/fruit/apple-2.png images/fruit/banana.png images/fruit/banana-1.png images/fruit/banana-2.png images/fruit/basaha.png images/fruit/basaha-1.png images/fruit/basaha-2.png images/fruit/peach.png images/fruit/peach-1.png images/fruit/peach-2.png images/fruit/sandia.png images/fruit/sandia-1.png images/fruit/sandia-2.png images/fruit/boom.png images/shadow.png images/home-mask.png images/logo.png images/ninja.png images/home-desc.png images/dojo.png images/new-game.png images/quit.png images/new.png images/score.png images/xxx.png images/xxxf.png images/game-over.png".split(" "),
        audios = "sounds/boom sounds/splatter sounds/menu sounds/throw sounds/over".split(" ");
    progressBar.len = imgs.length + audios.length;
    progressBar.subscribe('loaded', function() {
        this.loaded = this.loaded || 0;
        if (++this.loaded === progressBar.len) {
            this.publish('loadingDone');
        };
    });
    ImageEngine.loadImage('FruitNinja/images/progress_orange.gif', function() {
        var pattern,
            img = this;
        progressBar.draw = function(ctx) {
            pattern = pattern || ctx.createPattern(img, "repeat");
            ctx.fillStyle = pattern;
            ctx.fillRect(70, 230, 500 * Math.min(progressBar.loaded / progressBar.len, 1), img.height);
            ctx.strokeStyle = "#eee";
            ctx.rect(70, 230, 500, img.height);
            ctx.stroke();
        };
    });
    imgs.some(function(url) {
        ImageEngine.loadImage('FruitNinja/' + url, function() {
            BaseObject.prototype.publish('loaded');
        });
    });
    audios.some(function(url) {
        AudioEngine.loadAudio('FruitNinja/' + url, function() {
            BaseObject.prototype.publish('loaded');
        });
    });
    return new Scene().addChild(new Layer().addChild(progressBar));
}

function StartScene() {
    var layer = new Layer,
        bg = new Sprite(asserts.bg),
        logo = new Sprite(asserts.logo),
        mask = new Sprite(asserts.mask).addChild(logo),
        ninja = new Sprite(asserts.ninja),
        desc = new Sprite(asserts.desc),
        dojo = new Sprite(asserts.dojo),
        peach = new Sprite(asserts.startpeach),
        game = new Sprite(asserts.game),
        sandia = new Sprite(asserts.startsandia),
        quit = new Sprite(asserts.quit),
        boom = new Sprite(asserts.startboom);
    mask.runAction(Easing.withAction(new MoveTo(new Point(0, 0), 1000), 'easeOutQuad'));
    dojo.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 1000), new RepeatForever(new RotateTo(-Math.PI * 2, 4000))));
    game.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 1000), new RepeatForever(new RotateTo(Math.PI * 2, 4000))));
    quit.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 1000), new RepeatForever(new RotateTo(-Math.PI * 2, 4000))));
    sandia.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 1000), new RepeatForever(new RotateTo(-Math.PI * 2, 4000))));
    peach.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 1000), new RepeatForever(new RotateTo(Math.PI * 2, 4000))));
    boom.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 1000), new RepeatForever(new RotateTo(Math.PI * 2, 4000))));
    desc.runAction(new Sequence(new Delay(2000), new MoveBy(PointMake(200, 0), 200)));
    ninja.runAction(new Sequence(new Delay(1000), Easing.withAction(new MoveBy(PointMake(0, 110), 1000), 'easeOutBounce')));

    return new Scene().addChild(supportKnife(layer.addChild(bg).addChild(mask).addChild(ninja).addChild(desc).addChild(dojo).addChild(peach).addChild(game).addChild(sandia).addChild(boom).addChild(quit)));
}

function supportKnife(layer, knife) {
    if (!knife) {
        layer.addChild(knife = Knife());
    }
    var indrag;
    layer.onmousedown.push(function(e) {
        indrag = true;
    });
    layer.onmousemove.push(function(e) {
        if (!indrag) {
            return;
        }
        knife.parts = knife.parts || [];
        knife.parts.push({
            x: e.position.x,
            y: e.position.y,
            life: 15
        });
    });
    layer.onmouseup.push(function(e) {
        indrag = false;
        knife.parts = [];
    });
    layer.ontouchstart = layer.onmousedown;
    layer.ontouchmove = layer.onmousemove;
    layer.ontouchend = layer.onmouseup;
    return layer;
}

function GameScene() {}

function Knife() {
    var knife = new Sprite;
    knife.draw = function(ctx) {
        if (this.parts && this.parts.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = "#00ff00";
            for (var d = this.parts.length - 1; d >= 0; d--) {
                this.parts[d].life--;
                if (d === this.parts.length - 1) {
                    continue;
                }
                var from = this.parts[d + 1],
                    to = this.parts[d];
                if (from.life > 0) {
                    ctx.lineWidth = parseInt(12 * to.life / 15);
                    ctx.moveTo(from.x, from.y);
                    ctx.lineTo(to.x, to.y);
                    ctx.stroke();
                } else {
                    this.parts.splice(d, 1);
                }
            }
            ctx.closePath();

            ctx.beginPath();
            ctx.strokeStyle = "#FFFFFF";
            for (var d = this.parts.length - 2; d >= 0; d--) {
                var from = this.parts[d + 1],
                    to = this.parts[d];
                ctx.lineWidth = parseInt(8 * to.life / 15);
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.stroke();
            }
            ctx.closePath();
        }
    };
    return knife;
}

function Fruit(type) {
    var fruit = new Sprite();
    fruit.reset = function() {

    };
    return fruit;
}
var FruitFactory = function() {
    var factory = [];
    return {
        getFruit: function(type) {
            if (type && factory[type] && factory[type].length) {
                return factory[type].pop();
            } else {
                return Fruit(type);
            }
        },
        collect: function(fruit) {
            factory[fruit.type] = factory[fruit.type] || [];
            factory[fruit.type].push(fruit.reset());
        }
    }
}();
domReady(function() {
    FruitNinja();
});