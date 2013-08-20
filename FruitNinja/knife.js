function Knife() {
    var knife = new Sprite,
        innerWidth = 8,
        outerWidth = 12;
    knife.onUpdate = function(){
        if (this.parts && this.parts.length > 1) {
            this.parts.splice(0, this.parts.length - 10);
            var len = this.parts.length;
            for(var d = 0; d < len; d++){
                if(--this.parts[d].life <= 0){
                    len--;
                }
            }
            if(this.parts.length > len){
                this.parts.splice(0, this.parts.length - len).forEach(function(part, index){
                    knifeFactory.collect(part);
                });
            }
            !this.sleep && this.publish('knifeslice', this.parts);
        }
    };
    knife.drawGL = function(gl) {
        WebGLUtil.render(gl, this, 1, null, null, {x:0,y:0}, {x:0,y:0}, 0, 0, {x:1,y:1});
    };
    knife.draw = function(ctx) {
        if (this.parts && this.parts.length > 1) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = "#00ff00";
            for (var d = this.parts.length - 2; d >= 0; d--) {
                if (d === this.parts.length - 1) {
                    continue;
                }
                var from = this.parts[d + 1],
                    to = this.parts[d];
                if (from.life > 0) {
                    ctx.lineWidth = parseInt(outerWidth * to.life / 1.5) /10;
                    ctx.moveTo(from.x, from.y);
                    ctx.lineTo(to.x, to.y);
                    ctx.stroke();
                }
            }
            ctx.closePath();

            ctx.beginPath();
            ctx.strokeStyle = "#FFFFFF";
            for (var d = this.parts.length - 2; d >= 0; d--) {
                var from = this.parts[d + 1],
                    to = this.parts[d];
                ctx.lineWidth = parseInt(innerWidth * to.life / 1.5) / 10;
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.stroke();
            }
            ctx.closePath();

            ctx.restore();
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