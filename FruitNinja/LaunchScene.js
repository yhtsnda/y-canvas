function LaunchScene() {
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

    return new Scene().addChild(layer.addChild(bg).addChild(mask).addChild(ninja).addChild(desc).addChild(dojo).addChild(peach).addChild(game).addChild(sandia).addChild(boom).addChild(quit));
}