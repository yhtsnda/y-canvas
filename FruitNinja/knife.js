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

            !this.sleep && this.publish('knifeslice', this.parts);
        }
    };
    knife.subscribe('gameover', function(){
        this.sleep = true;
    });
    knife.subscribe('gamerestart', function(){
        this.sleep = false;
    });
    return knife;
}