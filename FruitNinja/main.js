var defaultFunc = function() {},
    knifeFactory = Factory(function createKnife(){
        return {
            reset: function(x, y, life) {
                this.x = x;
                this.y = y;
                this.life = life;
                return this;
            }
        }
    }),
    blotFactory = Factory(function(){
        return new Sprite;
    }),
    FruitPartFactory = (function() {
        var factory = [];
        return {
            getFruitPart: function(type) {
                if (factory[type] && factory[type].length) {
                    return factory[type].pop();
                } else {
                    return new Sprite(asserts[type]);
                }
            },
            collect: function(part) {
                factory[part.type] = factory[part.type] || [];
                factory[part.type].push(part);
            },
            see: function() {
                return factory;
            }
        }
    })(),
    fruitFactory = Factory(function(){
        return new Sprite;
    });

function particle(img, pos) {
    var sys = new ParticleSystem;
    var gravity = new Gravity(0.2);
    for (var i = 0; i < 25; i++) {
        var particle = sys.getParticle().reset();
        particle.image({
            img: img
        });
        particle.position().reset(pos.x, pos.y);
        particle.scale = 0.5 + Math.random() * 0.3;
        particle.rotation = Math.random() * Math.PI * 2;
        particle.damp().reset(0, 0);
        particle.velocity().reset(0, -(4 + Math.random() * 4));
        particle.velocity().rotate(360 * Math.random());
        particle.forcesMap().push(gravity);
        particle.alpha = 0.5 + Math.random() * 0.5;
        sys.addChild(particle);
        particle.onUpdate = function() {
            this.scale -= 0.02;
            this.alpha -= 0.05;
            if (this.scale <= 0) {
                this.remove();
                if (this.parent().children().length == 0) {
                    this.parent().remove();
                }
            }
        };
    }
    return sys;
}

function FruitNinja() {
    var dom = document.getElementById('app');
    dom.width = 640; //device.resolution.w;
    dom.height = 480; //device.resolution.h;
    var app = new Application(dom);

    var gameStateManager = (function() {
        var scenes = app.children(),
            states = {
                'loading': function() {
                    app.addChildAt(LoadingScene(), 0);
                },
                'introduce': function() {
                    app.getChildAt(0).clear();
                    //exec(scenes.shift(), 'clear');
                    app.addChildAt(LaunchScene(), 0);
                },
                'game': function() {
                    app.getChildAt(0).clear();
                    //exec(scenes.shift(), 'clear');
                    app.addChildAt(GameScene(), 0);
                },
                'gameover': function() {
                    app.getChildAt(0).clear();
                    //exec(scenes.shift(), 'clear');
                    app.addChildAt(GameoverScene(), 0);
                }
            };
        app.addChildAt(KnifeScene(), 0);
        return {
            changeState: function(state) {
                states[state] && states[state]();
            }
        }
    })();
    gameStateManager.changeState('loading');
    MessageCenter.onSubscribe('loading', function() {
        gameStateManager.changeState('loading');
    }).onSubscribe('introduce', function() {
        gameStateManager.changeState('introduce');
    }).onSubscribe('gamestart', function() {
        setTimeRequest(function() {
            gameStateManager.changeState('game');
        }, 2);
    }).onSubscribe('restart', function() {
        setTimeRequest(function() {
            gameStateManager.changeState('introduce');
        }, 2);
    });
    app.run();
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
        knife.parts.push(knifeFactory.get().reset(e.position.x, e.position.y, 15));
    });
    layer.onmouseup.push(function(e) {
        indrag = false;
        knife.parts = [];
        forEach(knife.parts, function(part) {
            knifeFactory.collect(part);
        });
    });
    layer.ontouchstart = layer.onmousedown;
    layer.ontouchmove = layer.onmousemove;
    layer.ontouchend = layer.onmouseup;
    return layer;
}

function KnifeScene() {
    var scene = new Scene().addChild(supportKnife(new Layer()));
    scene.name = 'knife';
    return scene;
}
domReady(function() {
    FruitNinja();
});