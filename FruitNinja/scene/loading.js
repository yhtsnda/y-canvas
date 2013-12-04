define('fruit/scene/loading', ['scene', 'layer', 'sprite', 'image'], function(Scene, Layer, Sprite, Image) {
    return function LoadingScene() {
        var progress = new Sprite,
            imgs = "images/background.jpg images/boom.png images/xxxf.png images/dojo.png images/gameover.png images/home-desc.png images/home-mask.png images/logo.png images/new-game.png images/new.png images/ninja.png images/progress_orange.gif images/quit.png images/score.png images/shadow.png images/xxx.png images/xxxf.png images/fruit/apple-j.png images/fruit/apple-l.png images/fruit/apple-r.png images/fruit/apple-s.png images/fruit/apple.png images/fruit/banana-j.png images/fruit/banana-l.png images/fruit/banana-r.png images/fruit/banana-s.png images/fruit/banana.png images/fruit/basaha-j.png images/fruit/basaha-l.png images/fruit/basaha-r.png images/fruit/basaha-s.png images/fruit/basaha.png images/fruit/peach-j.png images/fruit/peach-l.png images/fruit/peach-r.png images/fruit/peach-s.png images/fruit/peach.png images/fruit/sandia-j.png images/fruit/sandia-l.png images/fruit/sandia-r.png images/fruit/sandia-s.png images/fruit/sandia.png".split(" ");
        progress.len = imgs.length;
        progress.on('loaded', function() {
            this.loaded = this.loaded || 0;
            if (++this.loaded === progress.len) {
                this.pub('introduce');
            };
        });
        Image.load('FruitNinja/' + 'images/progress_orange.gif', function() {
            var pattern,
                img = this;
            progress.draw = function(ctx) {
                pattern = pattern || ctx.createPattern(img, "repeat");
                ctx.fillStyle = pattern;
                ctx.fillRect(70, 230, 500 * Math.min(progress.loaded / progress.len, 1), img.height);
                ctx.strokeStyle = "#eee";
                ctx.rect(70, 230, 500, img.height);
                ctx.stroke();
            };
            imgs.some(function(url) {
                Image.load('FruitNinja/' + url, function() {
                    progress.pub('loaded');
                });
            });
        });
        return new Scene().addChild(new Layer().addChild(progress));
    }
});