var reset = function() {
    this.unSubscribe('knifeslice');
    this.subscribe('knifeslice', handleCross);
    this.parent(null);
    this.children([]);
    this.departed = false;
    this.depart = function() {
        AudioEngine.play('sounds/splatter');
        this.publish('depart');
        this.unSubscribe('knifeslice');
        this.departed = true;
        this.onUpdate = defaultFunc;
        this.images().empty();
        this.rotate(0);
        var blot = blotFactory.get();
        blot.zIndex(21);
        blot.alpha(1);
        blot.images({
            img: this.blot
        });
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
        this.parent().addChild(particle(ImageEngine.get(this.juice), PointMake(this.actualPosition().x, this.actualPosition().y)));
        left.onUpdate = function() {
            this.position().x -= 2;
        }
        right.onUpdate = function() {
            this.position().x += 2;
        }
        this.addChild(left).addChild(right);
    };
    return this;
}, asserts = {
        bg: {
            zIndex: -1,
            _draw: function(ctx){
                this.pattern = this.pattern || ctx.createPattern(ImageEngine.get('images/background.jpg'), "repeat");
                ctx.fillStyle = this.pattern;
                ctx.fillRect(0,0,getDom().width,getDom().height);
            },
            images: {
                img: 'images/background.jpg'
            },
            position: PointMake(0, 0),
            width: 640,
            height: 480
        },
        logo: {
            images: {
                img: 'images/logo.png'
            },
            position: PointMake(20, 0),
            width: 288,
            height: 135
        },
        mask: {
            images: {
                img: 'images/home-mask.png'
            },
            position: PointMake(0, -200),
            width: 640,
            height: 183
        },
        ninja: {
            images: {
                img: 'images/ninja.png'
            },
            position: PointMake(340, -81),
            width: 244,
            height: 81
        },
        desc: {
            images: {
                img: 'images/home-desc.png'
            },
            position: PointMake(-200, 130),
            width: 161,
            height: 91
        },
        dojo: {
            images: {
                img: 'images/dojo.png'
            },
            position: PointMake(30, 250),
            width: 175,
            height: 175,
            scale: PointMake(0, 0)
        },
        startpeach: {
            images: {
                img: 'images/fruit/peach.png'
            },
            position: PointMake(86, 308),
            width: 62,
            height: 59,
            scale: PointMake(0, 0)
        },
        game: {
            images: {
                img: 'images/new-game.png'
            },
            width: 195,
            height: 195,
            position: PointMake(230, 240),
            scale: PointMake(0, 0)
        },
        startsandia: {
            images: {
                img: 'images/fruit/sandia.png'
            },
            width: 98,
            height: 85,
            position: PointMake(278, 295),
            scale: PointMake(0, 0)
        },
        quit: {
            images: {
                img: 'images/quit.png'
            },
            width: 141,
            height: 141,
            position: PointMake(480, 300),
            scale: PointMake(0, 0)
        },
        startboom: {
            images: {
                img: 'images/boom.png'
            },
            width: 66,
            height: 68,
            position: PointMake(517, 337),
            scale: PointMake(0, 0)
        },
        apple: {
            images: {
                img: 'images/fruit/apple.png'
            },
            type: 'apple',
            juice: 'images/fruit/apple-j.png',
            blot: 'images/fruit/apple-s.png',
            width: 66,
            height: 66,
            reset: reset
        },
        appleLeft: {
            images: {
                img: 'images/fruit/apple-l.png'
            },
            width: 66,
            height: 66
        },
        appleRight: {
            images: {
                img: 'images/fruit/apple-r.png'
            },
            width: 66,
            height: 66
        },
        peach: {
            images: {
                img: 'images/fruit/peach.png'
            },
            type: 'peach',
            juice: 'images/fruit/peach-j.png',
            blot: 'images/fruit/peach-s.png',
            width: 62,
            height: 59,
            reset: reset
        },
        peachLeft: {
            images: {
                img: 'images/fruit/peach-l.png'
            },
            width: 62,
            height: 59
        },
        peachRight: {
            images: {
                img: 'images/fruit/peach-r.png'
            },
            width: 62,
            height: 59
        },
        banana: {
            images: {
                img: 'images/fruit/banana.png'
            },
            type: 'banana',
            juice: 'images/fruit/banana-j.png',
            blot: 'images/fruit/banana-s.png',
            width: 126,
            height: 50,
            reset: reset
        },
        bananaLeft: {
            images: {
                img: 'images/fruit/banana-l.png'
            },
            width: 126,
            height: 50
        },
        bananaRight: {
            images: {
                img: 'images/fruit/banana-r.png'
            },
            width: 126,
            height: 50
        },
        basaha: {
            images: {
                img: 'images/fruit/basaha.png'
            },
            type: 'basaha',
            juice: 'images/fruit/basaha-j.png',
            blot: 'images/fruit/basaha-s.png',
            width: 68,
            height: 72,
            reset: reset
        },
        basahaLeft: {
            images: {
                img: 'images/fruit/basaha-l.png'
            },
            width: 68,
            height: 72,
            position: PointMake(0, 0)
        },
        basahaRight: {
            images: {
                img: 'images/fruit/basaha-r.png'
            },
            width: 68,
            height: 72,
            position: PointMake(0, 0)
        },
        sandia: {
            images: {
                img: 'images/fruit/sandia.png'
            },
            type: 'sandia',
            juice: 'images/fruit/sandia-j.png',
            blot: 'images/fruit/sandia-s.png',
            width: 98,
            height: 85,
            reset: reset
        },
        sandiaLeft: {
            images: {
                img: 'images/fruit/sandia-l.png'
            },
            width: 98,
            height: 85
        },
        sandiaRight: {
            images: {
                img: 'images/fruit/sandia-r.png'
            },
            width: 98,
            height: 85
        },
        score: {
            position: PointMake(20, 30),
            images: {
                img: 'images/score.png'
            },
            zIndex: 1,
            width: 29,
            height: 31
        },
        miss: {
            images: {
                img: 'images/xxxf.png'
            },
            width: 32,
            height: 32
        },
        gameover: {
            images: {
                img: 'images/gameover.png'
            },
            width: 490,
            height: 85,
            scale: PointMake(0, 0),
            position: PointMake(75, 200),
            zIndex: 30
        }
    };