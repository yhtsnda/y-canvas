var defaultFunc = function() {},
    checkCross = function(parts) {
        if (!parts || this.departed) {
            return;
        }
        for (var i = 0; i <= parts.length - 2; i++) {
            var from = parts[i],
                to = parts[i + 1],
                pos = this.actualPosition(),
                x = lineInEllipse([from.x, from.y], [to.x, to.y], [pos.x + this.width() / 2, pos.y + this.height() / 2], 15, 1);
            if (x && x[0] && x[1]) {
                this.depart();
                break;
            }
        }
    },
    reset = function() {
        this.unSubscribe('knifeslice');
        this.subscribe('knifeslice', checkCross);
        this.parent(null);
        this.children([]);
        this.departed = false;
        this.depart = function() {
            this.unSubscribe('knifeslice');
            this.departed = true;
            this.onUpdate = defaultFunc;
            this.images([]);
            this.rotate(0);
            var blot = blotFactory.getBlot();
            blot.alpha(1);
            blot.images([{
                    img: this.blot
                }
            ]);
            blot.position(PointMake(this.position().x, this.position().y));
            blot.onUpdate = function() {
                this.alpha(Math.max(0, this.alpha() - 0.015));
                if (this.alpha() <= 0) {
                    this.parent().removeChild(this);
                    blotFactory.collect(this);
                }
            };
            this.parent().addChild(blot);
            var left = FruitPartFactory.getFruitPart(this.type + 'Left'),
                right = FruitPartFactory.getFruitPart(this.type + 'Right');
            left.position().reset(0, 0);
            right.position().reset(0, 0);
            this.parent().addChild(particle(ImageEngine.loadImage(this.juice), PointMake(this.actualPosition().x + this.width() / 2, this.actualPosition().y + this.height() / 2)));
            left.onUpdate = function() {
                this.position().x -= 2;
            }
            right.onUpdate = function() {
                this.position().x += 2;
            }
            this.addChild(left).addChild(right);
        };
        return this;
    },
    asserts = {
        bg: {
            images: [{
                    img: 'images/background.jpg'
                }
            ]
        },
        logo: {
            images: [{
                    img: 'images/logo.png'
                }
            ],
            position: PointMake(20, 0)
        },
        mask: {
            images: [{
                    img: 'images/home-mask.png'
                }
            ],
            position: PointMake(0, -200)
        },
        ninja: {
            images: [{
                    img: 'images/ninja.png'
                }
            ],
            position: PointMake(340, -81),
            width: 244,
            height: 81
        },
        desc: {
            images: [{
                    img: 'images/home-desc.png'
                }
            ],
            position: PointMake(-200, 130)
        },
        dojo: {
            images: [{
                    img: 'images/dojo.png'
                }
            ],
            position: PointMake(30, 250),
            width: 175,
            height: 175,
            scale: PointMake(0, 0)
        },
        startpeach: {
            images: [{
                    img: 'images/fruit/peach.png'
                }
            ],
            position: PointMake(86, 308),
            width: 62,
            height: 59,
            scale: PointMake(0, 0)
        },
        game: {
            images: [{
                    img: 'images/new-game.png'
                }
            ],
            width: 195,
            height: 195,
            position: PointMake(230, 240),
            scale: PointMake(0, 0)
        },
        startsandia: {
            images: [{
                    img: 'images/fruit/sandia.png'
                }
            ],
            width: 98,
            height: 85,
            position: PointMake(278, 295),
            scale: PointMake(0, 0)
        },
        quit: {
            images: [{
                    img: 'images/quit.png'
                }
            ],
            width: 141,
            height: 141,
            position: PointMake(480, 300),
            scale: PointMake(0, 0)
        },
        startboom: {
            images: [{
                    img: 'images/boom.png'
                }
            ],
            width: 66,
            height: 68,
            position: PointMake(517, 337),
            scale: PointMake(0, 0)
        },
        apple: {
            images: [{
                    img: 'images/fruit/apple.png'
                }
            ],
            type: 'apple',
            juice: 'images/fruit/apple-j.png',
            blot: 'images/fruit/apple-s.png',
            width: 66,
            height: 66,
            reset: reset
        },
        appleLeft: {
            images: [{
                    img: 'images/fruit/apple-l.png'
                }
            ],
            width: 66,
            height: 66
        },
        appleRight: {
            images: [{
                    img: 'images/fruit/apple-r.png'
                }
            ],
            width: 66,
            height: 66
        },
        peach: {
            images: [{
                    img: 'images/fruit/peach.png'
                }
            ],
            type: 'peach',
            juice: 'images/fruit/peach-j.png',
            blot: 'images/fruit/peach-s.png',
            width: 62,
            height: 59,
            reset: reset
        },
        peachLeft: {
            images: [{
                    img: 'images/fruit/peach-l.png'
                }
            ],
            width: 62,
            height: 59
        },
        peachRight: {
            images: [{
                    img: 'images/fruit/peach-r.png'
                }
            ],
            width: 62,
            height: 59
        },
        banana: {
            images: [{
                    img: 'images/fruit/banana.png'
                }
            ],
            type: 'banana',
            juice: 'images/fruit/banana-j.png',
            blot: 'images/fruit/banana-s.png',
            width: 126,
            height: 50,
            reset: reset
        },
        bananaLeft: {
            images: [{
                    img: 'images/fruit/banana-l.png'
                }
            ],
            width: 126,
            height: 50
        },
        bananaRight: {
            images: [{
                    img: 'images/fruit/banana-r.png'
                }
            ],
            width: 126,
            height: 50
        },
        basaha: {
            images: [{
                    img: 'images/fruit/basaha.png'
                }
            ],
            type: 'basaha',
            juice: 'images/fruit/basaha-j.png',
            blot: 'images/fruit/basaha-s.png',
            width: 68,
            height: 72,
            reset: reset
        },
        basahaLeft: {
            images: [{
                    img: 'images/fruit/basaha-l.png'
                }
            ],
            width: 68,
            height: 72,
            position: PointMake(0, 0)
        },
        basahaRight: {
            images: [{
                    img: 'images/fruit/basaha-r.png'
                }
            ],
            width: 68,
            height: 72,
            position: PointMake(0, 0)
        },
        sandia: {
            images: [{
                    img: 'images/fruit/sandia.png'
                }
            ],
            type: 'sandia',
            juice: 'images/fruit/sandia-j.png',
            blot: 'images/fruit/sandia-s.png',
            width: 98,
            height: 85,
            reset: reset
        },
        sandiaLeft: {
            images: [{
                    img: 'images/fruit/sandia-l.png'
                }
            ],
            width: 98,
            height: 85
        },
        sandiaRight: {
            images: [{
                    img: 'images/fruit/sandia-r.png'
                }
            ],
            width: 98,
            height: 85
        },
        gameover: {
            images: [{
                    img: 'images/gameover.png'
                }
            ],
            width: 490,
            height: 85,
            scale: PointMake(0, 0),
            position: PointMake(75, 200)
        }
    }, knifeFactory = (function() {
        var knifes = [];

        function createKnife() {
            return {
                reset: function(x, y, life) {
                    this.x = x;
                    this.y = y;
                    this.life = life;
                    return this;
                }
            }
        }
        return {
            getKnife: function() {
                return knifes.length ? knifes.pop() : createKnife();
            },
            collect: function(knife) {
                knifes.push(knife);
            },
            see: function() {
                return knifes;
            }
        }
    })(),
    juiceFactory = (function() {
        var juices = [];

        function createJuice() {
            return new Particle;
        }
        return {
            getJuice: function() {
                return juices.length ? juices.pop() : createJuice();
            },
            collect: function(juice) {
                juices.push(juice);
            },
            see: function() {
                return juices;
            }
        }
    })(),
    blotFactory = (function() {
        var blots = [];

        function createBlot() {
            return new Sprite;
        }
        return {
            getBlot: function() {
                return blots.length ? blots.pop() : createBlot();
            },
            collect: function(blot) {
                blots.push(blot);
            },
            see: function() {
                return blots;
            }
        }
    })(),
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
    lineInEllipse = (function() {
        function sqr(x) {
            return x * x;
        }

        function sign(n) {
            return n < 0 ? -1 : (n > 0 ? 1 : 0);
        }

        function equation12(a, b, c) {
            if (a == 0) return;

            var delta = b * b - 4 * a * c;
            if (delta == 0)
                return [-1 * b / (2 * a), -1 * b / (2 * a)];
            else if (delta > 0)
                return [(-1 * b + Math.sqrt(delta)) / (2 * a), (-1 * b - Math.sqrt(delta)) / (2 * a)];
        }

        // 返回线段和椭圆的两个交点，如果不相交，返回 null

        function lineXEllipse(p1, p2, c, r, e) {
            // 线段：p1, p2    圆心：c    半径：r    离心率：e
            if (r <= 0) return;
            e = e === undefined ? 1 : e;
            var t1 = r,
                t2 = r * e,
                k;

            a = sqr(t2) * sqr(p1[0] - p2[0]) + sqr(t1) * sqr(p1[1] - p2[1]);

            if (a <= 0) return;

            b = 2 * sqr(t2) * (p2[0] - p1[0]) * (p1[0] - c[0]) + 2 * sqr(t1) * (p2[1] - p1[1]) * (p1[1] - c[1]);
            c = sqr(t2) * sqr(p1[0] - c[0]) + sqr(t1) * sqr(p1[1] - c[1]) - sqr(t1) * sqr(t2);

            if (!(k = equation12(a, b, c, t1, t2))) return;

            var result = [
                [p1[0] + k[0] * (p2[0] - p1[0]), p1[1] + k[0] * (p2[1] - p1[1])],
                [p1[0] + k[1] * (p2[0] - p1[0]), p1[1] + k[1] * (p2[1] - p1[1])]
            ];

            if (!((sign(result[0][0] - p1[0]) * sign(result[0][0] - p2[0]) <= 0) &&
                (sign(result[0][1] - p1[1]) * sign(result[0][1] - p2[1]) <= 0)))
                result[0] = null;

            if (!((sign(result[1][0] - p1[0]) * sign(result[1][0] - p2[0]) <= 0) &&
                (sign(result[1][1] - p1[1]) * sign(result[1][1] - p2[1]) <= 0)))
                result[1] = null;

            return result;
        }

        // 判断计算线段和椭圆是否相交
        return lineXEllipse;
    })(),
    fruitFactory = (function() {
        var factory = [];
        return {
            getFruit: function() {
                return factory.length ? factory.pop() : new Sprite;
            },
            collect: function(fruit) {
                factory.push(fruit);
            },
            see: function() {
                return factory;
            }
        }
    })();

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
                this.parent().removeChild(this);
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

function LoadingScene() {
    var progressBar = new Sprite,
        imgs = "images/background.jpg images/fruit/apple.png images/fruit/apple-l.png images/fruit/apple-r.png images/fruit/banana.png images/fruit/banana-l.png images/fruit/banana-r.png images/fruit/basaha.png images/fruit/basaha-l.png images/fruit/basaha-r.png images/fruit/peach.png images/fruit/peach-l.png images/fruit/peach-r.png images/fruit/sandia.png images/fruit/sandia-l.png images/fruit/sandia-r.png images/boom.png images/shadow.png images/home-mask.png images/logo.png images/ninja.png images/home-desc.png images/dojo.png images/new-game.png images/quit.png images/new.png images/score.png images/xxx.png images/xxxf.png images/gameover.png".split(" "),
        audios = "sounds/boom sounds/splatter sounds/menu sounds/throw sounds/over".split(" ");
    progressBar.len = imgs.length + audios.length;
    progressBar.subscribe('loaded', function() {
        this.loaded = this.loaded || 0;
        if (++this.loaded === progressBar.len) {
            this.publish('introduce');
        };
    });
    ImageEngine.loadImage('images/progress_orange.gif', function() {
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
        ImageEngine.loadImage('' + url, function() {
            BaseObject.prototype.publish('loaded');
        });
    });
    audios.some(function(url) {
        AudioEngine.loadAudio('' + url, function() {
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
    peach.depart = function() {
        this.unSubscribe();
        this.publish('gamestart');
    };
    mask.runAction(Easing.withAction(new MoveTo(new Point(0, 0), 1000), 'easeOutQuad'));
    dojo.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 300), new RepeatForever(new RotateTo(-Math.PI * 2, 4000))));
    game.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 300), new RepeatForever(new RotateTo(Math.PI * 2, 4000))));
    quit.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 300), new RepeatForever(new RotateTo(-Math.PI * 2, 4000))));
    sandia.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 300), new RepeatForever(new RotateTo(-Math.PI * 2, 4000))));
    peach.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 300, function() {
        peach.subscribe('knifeslice', checkCross);
    }), new RepeatForever(new RotateTo(Math.PI * 2, 4000))));
    boom.runAction(new Sequence(new Delay(2500), new ScaleTo(PointMake(1, 1), 300), new RepeatForever(new RotateTo(Math.PI * 2, 4000))));
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
        knife.parts.push(knifeFactory.getKnife().reset(e.position.x, e.position.y, 15));
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

function GameScene() {
    var layer = new Layer,
        bg = new Sprite(asserts.bg),
        animation;

    function createFruit() {
        if (Math.random() > 0.5) {
            var fruit = fruitFactory.getFruit()._init(asserts[(function() {
                return ['peach', 'sandia', 'banana', 'basaha', 'apple'][parseInt(Math.random() * 5)]
            })()]).reset();
            fruit.position(PointMake(100 + Math.random() * 440, 480));
            fruit.rotate(Math.PI * Math.random());
            var v0 = -18 - 2 * Math.random(),
                a = 0.4 + Math.random() * 0.1,
                t = 0,
                rotate = 0.05 - Math.random() * 0.1;
            fruit.onUpdate = function() {
                this.rotate(this.rotate() + rotate);
            };
            fruit.afterUpdate = function() {
                this.position().y = 480 + v0 * ++t + 0.5 * a * t * t;
                if (this.actualPosition().y > 480 + this.height()) {
                    if (!this.departed) {
                        this.publish('missfruit', this.actualPosition().x);
                    }
                    this.parent().removeChild(this);
                    this.unSubscribe('knifeslice');
                    fruitFactory.collect(this);
                }
            };
            layer.addChild(fruit);
        }
        animation = setTimeout(createFruit, 100);
    }
    animation = setTimeout(createFruit, 100);
    var missed = 0;
    layer.subscribe('missfruit', function(x) {
        if (++missed >= 3) {
            layer.unSubscribe('missfruit');
            clearTimeout(animation);
            this.publish('gameover');
            return;
        }
        var miss = new Sprite({
            images: [{
                    img: 'images/xxxf.png'
                }
            ],
            position: PointMake(x, 500)
        });
        this.addChild(miss);
        miss.runAction(new Sequence(new MoveBy(PointMake(0, -80), 1000), new Delay(500), new FadeOut(1000, function() {
            miss.parent().removeChild(miss);
        })));
    });
    layer.subscribe('gameover', function() {
        var gameover = new Sprite(asserts.gameover);
        this.addChild(gameover);
        gameover.runAction(new ScaleTo(PointMake(1, 1), 200));
        gameover.onmousedown.push(function(){
            this.runAction(new ScaleTo(PointMake(0,0),200,function(){
                gameover.unSubscribe();
                gameover.publish('loading');
            }));
        });
    })
    return new Scene().addChild(supportKnife(layer.addChild(bg)));
}

function Knife() {
    var knife = new Sprite,
        innerWidth = 8,
        outerWidth = 12;
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

            this.publish('knifeslice', this.parts);
        }
    };
    return knife;
}

domReady(function() {
    FruitNinja();
});