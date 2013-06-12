var asserts = {
    bg : {
        images : [{
                img : 'FruitNinja/images/background.jpg'
            }
        ]
    },
    logo : {
        images : [{
                img : 'FruitNinja/images/logo.png'
            }
        ],
        position : PointMake(20, 0)
    },
    mask : {
        images : [{
                img : 'FruitNinja/images/home-mask.png'
            }
        ],
        position : PointMake(0, -200)
    },
    ninja : {
        images : [{
                img : 'FruitNinja/images/ninja.png'
            }
        ],
        position : PointMake(340, -81),
        width : 244,
        height : 81
    },
    desc : {
        images : [{
                img : 'FruitNinja/images/home-desc.png'
            }
        ],
        position : PointMake(-200, 130)
    },
    dojo : {
        images : [{
                img : 'FruitNinja/images/dojo.png'
            }
        ],
        position : PointMake(30, 250),
        width : 175,
        height : 175,
        scale : PointMake(0, 0)
    },
    startpeach : {
        images : [{
                img : 'FruitNinja/images/fruit/peach.png'
            }
        ],
        position : PointMake(86, 308),
        width : 62,
        height : 59,
        scale : PointMake(0, 0)
    },
    game : {
        images : [{
                img : 'FruitNinja/images/new-game.png'
            }
        ],
        width : 195,
        height : 195,
        position : PointMake(230, 240),
        scale : PointMake(0, 0)
    },
    startsandia : {
        images : [{
                img : 'FruitNinja/images/fruit/sandia.png'
            }
        ],
        width : 98,
        height : 85,
        position : PointMake(278, 295),
        scale : PointMake(0, 0)
    },
    quit : {
        images : [{
                img : 'FruitNinja/images/quit.png'
            }
        ],
        width : 141,
        height : 141,
        position : PointMake(480, 300),
        scale : PointMake(0, 0)
    },
    startboom : {
        images : [{
                img : 'FruitNinja/images/boom.png'
            }
        ],
        width : 66,
        height : 68,
        position : PointMake(517, 337),
        scale : PointMake(0, 0)
    },
    apple : {
        images : [{
                img : 'FruitNinja/images/fruit/apple.png'
            }
        ],
        juice : 'FruitNinja/images/fruit/apple-j.png',
        width : 66,
        height : 66,
        left : new Sprite({
            images : [{
                    img : 'FruitNinja/images/fruit/apple-l.png'
                }
            ],
            width : 66,
            height : 66
        }),
        right : new Sprite({
            images : [{
                    img : 'FruitNinja/images/fruit/apple-r.png'
                }
            ],
            width : 66,
            height : 66
        }),
        children : [],
        depart : function () {
            this.images([]);
            this.addChild(this.left).addChild(this.right);
        },
        reset : function () {
            this.children([]);
            delete this.depart;
            return this;
        }
    },
    peach : {
        images : [{
                img : 'FruitNinja/images/fruit/peach.png'
            }
        ],
        juice : 'FruitNinja/images/fruit/peach-j.png',
        width : 62,
        height : 59,
        left : new Sprite({
            images : [{
                    img : 'FruitNinja/images/fruit/peach-l.png'
                }
            ],
            width : 62,
            height : 59
        }),
        right : new Sprite({
            images : [{
                    img : 'FruitNinja/images/fruit/peach-r.png'
                }
            ],
            width : 62,
            height : 59
        }),
        children : [],
        depart : function () {
            this.images([]);
            this.addChild(this.left).addChild(this.right);
        },
        reset : function () {
            this.children([]);
            delete this.depart;
            return this;
        }
    },
    banana : {
        images : [{
                img : 'FruitNinja/images/fruit/banana.png'
            }
        ],
        juice : 'FruitNinja/images/fruit/banana-j.png',
        width : 126,
        height : 50,
        left : new Sprite({
            images : [{
                    img : 'FruitNinja/images/fruit/banana-l.png'
                }
            ],
            width : 126,
            height : 50
        }),
        right : new Sprite({
            images : [{
                    img : 'FruitNinja/images/fruit/basaha-r.png'
                }
            ],
            width : 126,
            height : 50
        }),
        children : [],
        depart : function () {
            this.images([]);
            this.addChild(this.left).addChild(this.right);
        },
        reset : function () {
            this.children([]);
            delete this.depart;
            return this;
        }
    },
    basaha : {
        images : [{
                img : 'FruitNinja/images/fruit/basaha.png'
            }
        ],
        juice : 'FruitNinja/images/fruit/basaha-j.png',
        width : 68,
        height : 72,
        left : new Sprite({
            images : [{
                    img : 'FruitNinja/images/fruit/basaha-l.png'
                }
            ],
            width : 68,
            height : 72
        }),
        right : new Sprite({
            images : [{
                    img : 'FruitNinja/images/fruit/basaha-r.png'
                }
            ],
            width : 68,
            height : 72
        }),
        children : [],
        depart : function () {
            this.images([]);
            this.addChild(this.left).addChild(this.right);
        },
        reset : function () {
            this.children([]);
            delete this.depart;
            return this;
        }
    },
    sandia : {
        images : [{
                img : 'FruitNinja/images/fruit/sandia.png'
            }
        ],
        juice : 'FruitNinja/images/fruit/sandia-j.png',
        width : 98,
        height : 85,
        left : new Sprite({
            images : [{
                    img : 'FruitNinja/images/fruit/sandia-l.png'
                }
            ],
            width : 98,
            height : 85
        }),
        right : new Sprite({
            images : [{
                    img : 'FruitNinja/images/fruit/sandia-r.png'
                }
            ],
            width : 98,
            height : 85
        }),
        children : [],
        depart : function () {
            this.images([]);
            this.addChild(this.left).addChild(this.right);
        },
        reset : function () {
            this.children([]);
            delete this.depart;
            return this;
        }
    }
}, knifeFactory = (function () {
    var knifes = [];
    function createKnife() {
        return {
            reset : function (x, y, life) {
                this.x = x;
                this.y = y;
                this.life = life;
                return this;
            }
        }
    }
    return {
        getKnife : function () {
            return knifes.length ? knifes.pop() : createKnife();
        },
        collect : function (knife) {
            knifes.push(knife);
        },
        see : function () {
            return knifes;
        }
    }
})(), juiceFactory = (function () {
    var juices = [];
    function createJuice() {
        return new Particle;
    }
    return {
        getJuice : function () {
            return juices.length ? juices.pop() : createJuice();
        },
        collect : function (juice) {
            juices.push(juice);
        },
        see : function () {
            return juices;
        }
    }
})();

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
        gameStateManager.changeState('game');
    }).onSubscribe('fruit', function () {
        gameStateManager.changeState('introduce');
    });
    app.run();
}

function LoadingScene() {
    var progressBar = new Sprite,
    imgs = "images/background.jpg images/fruit/apple.png images/fruit/apple-l.png images/fruit/apple-r.png images/fruit/banana.png images/fruit/banana-l.png images/fruit/banana-r.png images/fruit/basaha.png images/fruit/basaha-l.png images/fruit/basaha-r.png images/fruit/peach.png images/fruit/peach-l.png images/fruit/peach-r.png images/fruit/sandia.png images/fruit/sandia-l.png images/fruit/sandia-r.png images/boom.png images/shadow.png images/home-mask.png images/logo.png images/ninja.png images/home-desc.png images/dojo.png images/new-game.png images/quit.png images/new.png images/score.png images/xxx.png images/xxxf.png images/game-over.png".split(" "),
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
    dojo.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 300), new RepeatForever(new RotateTo(-Math.PI * 2, 4000))));
    game.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 300), new RepeatForever(new RotateTo(Math.PI * 2, 4000))));
    quit.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 300), new RepeatForever(new RotateTo(-Math.PI * 2, 4000))));
    sandia.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 300), new RepeatForever(new RotateTo(-Math.PI * 2, 4000))));
    peach.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 300), new RepeatForever(new RotateTo(Math.PI * 2, 4000))));
    boom.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 300), new RepeatForever(new RotateTo(Math.PI * 2, 4000))));
    desc.runAction(new Sequence(new Delay(2000), new MoveBy(PointMake(200, 0), 200)));
    ninja.runAction(new Sequence(new Delay(1000), Easing.withAction(new MoveBy(PointMake(0, 110), 1000), 'easeOutBounce')));
    
    ImageEngine.loadImage('FruitNinja/images/fruit/apple-j.png', function () {
        var img = this;
        layer.onmousedown.push(function () {
            //par(layer, img);
        });
    });
    
    ImageEngine.loadImage('FruitNinja/images/fruit/basaha-j.png', function () {
        var img = this;
        layer.onmouseup.push(function () {
            par(layer, img);
        });
    });
    return new Scene().addChild(supportKnife(layer.addChild(bg).addChild(mask).addChild(ninja).addChild(desc).addChild(dojo).addChild(peach).addChild(game).addChild(sandia).addChild(boom).addChild(quit)));
}
function par(layer, img) {
    var sys = new ParticleSystem;
    var gravity = new Gravity(0.2);
    for (var i = 0; i < 50; i++) {
        var particle = sys.getParticle().reset();
        particle.image({
            img : img
        });
        particle.position().reset(320, 100);
        particle.scale = 0.8;
        particle.rotation = Math.random() * Math.PI * 2;
        particle.damp().reset(0, 0);
        particle.velocity().reset(0,  - (4 + Math.random() * 4));
        particle.velocity().rotate(360 * Math.random());
        particle.forcesMap().push(gravity);
        sys.addChild(particle);
        particle.onUpdate = function () {
            this.scale -= 0.02;
            this.alpha -= 0.05;
            if (this.scale <= 0) {
                this.parent().removeChild(this);
            }
        };
    }
    layer.addChild(sys);
    layer.onmousemove.push(function (e) {
        p.reset(e.position.x, e.position.y);
    });
}
function supportKnife(layer, knife) {
    if (!knife) {
        layer.addChild(knife = Knife());
    }
    var indrag;
    layer.onmousedown.push(function (e) {
        indrag = true;
    });
    layer.onmousemove.push(function (e) {
        if (!indrag) {
            return;
        }
        knife.parts = knife.parts || [];
        knife.parts.push(knifeFactory.getKnife().reset(e.position.x, e.position.y, 15));
    });
    layer.onmouseup.push(function (e) {
        indrag = false;
        knife.parts = [];
        forEach(knife.parts, function (part) {
            knifeFactory.collect(part);
        });
    });
    layer.ontouchstart = layer.onmousedown;
    layer.ontouchmove = layer.onmousemove;
    layer.ontouchend = layer.onmouseup;
    return layer;
}

function GameScene() {
    var layer = new Layer,
    bg = new Sprite(asserts.bg);
    function createFruit() {
        if (Math.random() > 0.5) {
            var fruit = FruitFactory.getFruit()._init(asserts[(function () {
                            return ['peach', 'sandia', 'banana', 'basaha'][parseInt(Math.random() * 4)]
                        })()]).reset();
            fruit.position(PointMake(100 + Math.random() * 440, 480));
            fruit.rotate(Math.PI * Math.random());
            var v0 = -18 - 2 * Math.random(),
            a = 0.4 + Math.random() * 0.1,
            t = 0,
            rotate = 0.05 - Math.random() * 0.1;
            fruit.onUpdate = function () {
                this.rotate(this.rotate() + rotate);
                this.position().y = 480 + v0 * ++t + 0.5 * a * t * t;
                if (this.position().y > 480) {
                    FruitFactory.collect(this);
                    this.parent().removeChild(this);
                    //console.log(this.images(),this.parent().children().length);
                }
            };
            layer.addChild(fruit);
        }
        setTimeRequest(createFruit, 10);
    }
    setTimeRequest(createFruit, 10);
    return new Scene().addChild(supportKnife(layer.addChild(bg)));
}
function Knife() {
    var knife = new Sprite,
    innerWidth = 8,
    outerWidth = 12;
    knife.draw = function (ctx) {
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
                    ctx.lineWidth = parseInt(outerWidth * to.life / 15);
                    ctx.moveTo(from.x, from.y);
                    ctx.lineTo(to.x, to.y);
                    ctx.stroke();
                } else {
                    knifeFactory.collect(this.parts.splice(d, 1)[0]);
                }
            }
            ctx.closePath();
            
            ctx.beginPath();
            ctx.strokeStyle = "#FFFFFF";
            for (var d = this.parts.length - 2; d >= 0; d--) {
                var from = this.parts[d + 1],
                to = this.parts[d];
                ctx.lineWidth = parseInt(innerWidth * to.life / 15);
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.stroke();
            }
            ctx.closePath();
        }
    };
    return knife;
}

var FruitFactory = function () {
    var factory = [];
    return {
        getFruit : function () {
            return factory.length ? factory.pop() : new Sprite;
        },
        collect : function (fruit) {
            factory.push(fruit);
        },
        see : function () {
            return factory;
        }
    }
}
();
domReady(function () {
    FruitNinja();
});
