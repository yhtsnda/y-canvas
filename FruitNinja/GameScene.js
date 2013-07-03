function GameScene() {
    var layer = new Layer,
        bg = new Sprite(asserts.bg),
        score = new Sprite({
            position: PointMake(20, 30),
            images: [{
                    img: 'images/score.png'
                }
            ]
        }),
        cutted = new Sprite({
            position: PointMake(60, 30)
        }),
        cuttedNum = 0,
        animation;

    function createFruit() {
        if (Math.random() > 0.5) {
            var fruit = fruitFactory.get()._init(asserts[(function() {
                return ['peach', 'sandia', 'banana', 'basaha', 'apple'][parseInt(Math.random() * 5)]
            })()]).reset();
            fruit.zIndex(1);
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
            AudioEngine.play('sounds/throw');
        }
        animation = setTimeRequest(createFruit, 40);
    }
    animation = setTimeRequest(createFruit, 40);
    cutted.position();
    cutted.draw = function(ctx) {
        ctx.fillStyle = "#af7c05";
        ctx.font = "34px Tahoma bold";
        ctx.textBaseline = "top";
        ctx.fillText(cuttedNum, this.actualPosition().x, this.actualPosition().y);
    };
    var missed = 0;
    layer.subscribe('depart', function() {
        cuttedNum++;
    });
    layer.subscribe('missfruit', function(x) {
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
        if (++missed == 3) {
            layer.unSubscribe('missfruit');
            cancelAnimFrame(animation.timeRequest);
            this.publish('gameover');
        }
    });
    layer.subscribe('gameover', function() {
        var gameover = new Sprite(asserts.gameover);
        this.addChild(gameover);
        gameover.runAction(new ScaleTo(PointMake(1, 1), 200));
        gameover.onmousedown.push(function() {
            this.runAction(new ScaleTo(PointMake(0, 0), 200, function() {
                gameover.unSubscribe();
                gameover.publish('introduce');
            }));
        });
        AudioEngine.play('sounds/over');
    });
    return new Scene().addChild(layer.addChild(bg).addChild(score).addChild(cutted));
}