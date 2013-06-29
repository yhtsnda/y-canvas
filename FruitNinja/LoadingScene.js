
function LoadingScene() {
    var progressBar = new Sprite,
        imgs = "images/background.jpg images/boom.png images/dojo.png images/gameover.png images/home-desc.png images/home-mask.png images/logo.png images/new-game.png images/new.png images/ninja.png images/progress_orange.gif images/quit.png images/score.png images/shadow.png images/xxx.png images/xxxf.png images/fruit/apple-j.png images/fruit/apple-l.png images/fruit/apple-r.png images/fruit/apple-s.png images/fruit/apple.png images/fruit/banana-j.png images/fruit/banana-l.png images/fruit/banana-r.png images/fruit/banana-s.png images/fruit/banana.png images/fruit/basaha-j.png images/fruit/basaha-l.png images/fruit/basaha-r.png images/fruit/basaha-s.png images/fruit/basaha.png images/fruit/peach-j.png images/fruit/peach-l.png images/fruit/peach-r.png images/fruit/peach-s.png images/fruit/peach.png images/fruit/sandia-j.png images/fruit/sandia-l.png images/fruit/sandia-r.png images/fruit/sandia-s.png images/fruit/sandia.png".split(" "),
        audios = "sounds/boom sounds/splatter sounds/menu sounds/throw sounds/over".split(" ");
    progressBar.len = imgs.length + audios.length;
    progressBar.subscribe('loaded', function() {
        this.loaded = this.loaded || 0;
        if (++this.loaded === progressBar.len) {
            this.publish('introduce');
        };
    });
    ImageEngine.load('images/progress_orange.gif', function() {
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
        ImageEngine.load(url, function() {
            BaseObject.prototype.publish('loaded');
        });
    });
    audios.some(function(url) {
        AudioEngine.load(url, function() {
            BaseObject.prototype.publish('loaded');
        });
    });
    return new Scene().addChild(new Layer().addChild(progressBar));
}