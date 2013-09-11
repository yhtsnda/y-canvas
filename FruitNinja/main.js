var defaultFunc = function() {},
    knifeFactory = Factory(function createKnife() {
        return {
            reset: function(x, y, life) {
                this.x = x;
                this.y = y;
                this.life = life;
                return this;
            }
        }
    }),
    blotFactory = Factory(function() {
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
    fruitFactory = Factory(function() {
        return new Sprite;
    });

function particle(img, pos) {
    var sys = new ParticleSystem;
    sys.zIndex(50);
    var gravity = new Gravity(0.2);
    var velocity = -4 -3 * Math.random();
    var random = Math.random() > 0.5;
    for (var i = 0; i < 12; i++) {
        var particle = sys.getParticle().reset();
        particle.image({
            img: img
        });
        particle.position().reset(pos.x, pos.y);
        particle.scale = 1; // + Math.random() * 0.3;
        particle.damp().reset(0, 0);
        particle.velocity().reset(0, velocity * (random ? Math.random() : 1));
        particle.velocity().rotate(i / 12 * Math.PI * 2);
        particle.forcesMap().push(gravity);
        particle.alpha = 1; // + Math.random() * 0.5;
        sys.addChild(particle);
        particle.onUpdate = function() {
            this.scale -= 0.02;
            this.alpha -= 0.01;
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

function TestScene(){
    var scene = new Scene;
    var layer = new Layer;
    var sprite = new Sprite;
    //sprite.position().x = 100;
    //sprite.position().y = 100;
    sprite.drawGL = function(gl){
        WebGLUtil.drawText(gl, true, this, Math.random(), {
            fillStyle : "#af7c05",
            font : "34px Tahoma bold",
            textBaseline : "top"
        }, this.actualPosition(), 200, 34);
    };
    scene.addChild(layer);
    layer.addChild(sprite);
    return scene;
}
function FruitNinja() {
    disablePageMove();
    start(function(dom) {
        var app = new Application(dom);

        var gameStateManager = (function() {
            var scenes = app.children(),
                states = {
                    'test': function(){
                        app.addChildAt(TestScene(),0);
                    },
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
            gameStateManager.changeState('game');
        }).onSubscribe('gamestart', function() {
            gameStateManager.changeState('game');
        }).onSubscribe('restart', function() {
            gameStateManager.changeState('introduce');
        });
        app.run();

    });
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
        layer.prev = layer.prev || {};
        knife.parts = knife.parts || [];
        if(layer.prev.x != e.position.x || layer.prev.y != e.position.y){
            knife.parts.push(knifeFactory.get().reset(e.position.x, e.position.y, 15));
            //console.log(layer.prev.x);
        };
        layer.prev.x = e.position.x;
        layer.prev.y = e.position.y;
    });
    layer.onmouseup.push(function(e) {
        indrag = false;
        forEach(knife.parts, function(part) {
            knifeFactory.collect(part);
        });
        knife.parts = [];
    });
    layer.ontouchstart = layer.onmousedown;
    layer.ontouchmove = layer.onmousemove;
    layer.ontouchend = layer.onmouseup;
    //layer.onmousedown = layer.onmouseup = layer.onmousemove = null;
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