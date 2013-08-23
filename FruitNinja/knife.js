function Knife() {
    var knife = new Sprite,
        innerWidth = 8,
        outerWidth = 12;
        //window.knife = knife;
    knife.onUpdate = function(){
        //this.parts = [knifeFactory.get().reset(200,100,15),knifeFactory.get().reset(100,200,15),knifeFactory.get().reset(300,400,15)];
        if (this.parts) {
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
        if(this.parts && this.parts.length > 1){
            this.pointsArr = this.pointsArr || [];
            this.pointsOuterArr = this.pointsOuterArr || [];
            this.colorArr = this.colorArr || [];
            this.colorOuterArr = this.colorOuterArr || [];
            this.pointsArr.length = this.pointsOuterArr.length = 0;
            this.colorArr.length = this.colorOuterArr.length = 0;
            for(var d = this.parts.length - 2; d >= 0; d--){
                var from = this.parts[d + 1],
                    to = this.parts[d];
                var w = to.x - from.x;
                var h = to.y - from.y;
                var k = w * h < 0 ? -1 : 1;
                var coso = Math.sqrt(w * w / (w * w + h * h));
                var sino = Math.sqrt(h * h / (w * w + h * h));
                var deltax = to.life * (sino) * k;
                var deltay = to.life * (coso) ;

                this.pointsArr.push(from.x *2 - deltax, 480-from.y *2 + 480 - deltay);
                this.pointsArr.push(from.x *2 + deltax, 480-from.y *2 + 480 + deltay);
                this.pointsArr.push(to.x *2 - deltax, 480-to.y *2 + 480 - deltay);
                this.pointsArr.push(to.x *2 + deltax, 480-to.y *2 + 480 + deltay);

                this.pointsOuterArr.push(from.x *2 - deltax*0.5, 480-from.y *2 + 480 - deltay*0.5);
                this.pointsOuterArr.push(from.x *2 + deltax*0.5, 480-from.y *2 + 480 + deltay*0.5);

                this.pointsOuterArr.push(to.x *2 - deltax*0.5, 480-to.y *2 + 480 - deltay*0.5);
                this.pointsOuterArr.push(to.x *2 + deltax*0.5, 480-to.y *2 + 480 + deltay*0.5);

                this.colorArr.push(0, 1, 0, 1);
                this.colorArr.push(0, 1, 0, 1);
                this.colorArr.push(0, 1, 0, 1);
                this.colorArr.push(0, 1, 0, 1);
                this.colorOuterArr.push(1, 1, 1, 1);
                this.colorOuterArr.push(1, 1, 1, 1);
                this.colorOuterArr.push(1, 1, 1, 1);
                this.colorOuterArr.push(1, 1, 1, 1);
            }
            WebGLUtil.render(gl, this, 1, null, null, {x:0.5,y:0.5}, {x:0,y:0}, 0, 0, {x:1,y:1}, null, null, this.pointsArr, this.colorArr);

            WebGLUtil.render(gl, this, 1, null, null, {x:0.5,y:0.5}, {x:0,y:0}, 0, 0, {x:1,y:1}, null, null,  this.pointsOuterArr, this.colorOuterArr);
        }
        //gl, obj, alpha, img, size, anchor, pos, rotate, translate, scale, width, height
    };
    knife.draw = function(ctx) {
            this.pointsArr = this.pointsArr || [];
            this.pointsArr.length = 0;
        if (this.parts && this.parts.length > 1) {

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = '#00ff00';
            for(var d = this.parts.length - 2; d >= 0; d--){
                var from = this.parts[d+1],
                    to = this.parts[d];
                var w = to.x - from.x;
                var h = to.y - from.y;
                var k = w * h < 0 ? 1 : -1;

                var coso = Math.sqrt(w * w / (w * w + h * h));
                var sino = Math.sqrt(h * h / (w * w + h * h));
                var deltax = to.life * (sino) * k /2;
                var deltay = to.life * (coso) / 2;
                this.pointsArr.push(
                    from.x - deltax *0.5, from.y - deltay *0.5,
                    from.x + deltax  *0.5, from.y + deltay *0.5,
                    to.x + deltax *0.5, to.y + deltay *0.5 ,
                    to.x - deltax *0.5, to.y - deltay  *0.5
                );
                ctx.moveTo(from.x - deltax, from.y - deltay);
                ctx.lineTo(from.x + deltax, from.y + deltay);
                ctx.lineTo(to.x + deltax, to.y + deltay);
                ctx.lineTo(to.x - deltax, to.y - deltay);
                ctx.lineTo(from.x - deltax, from.y - deltay);
            }
                ctx.fill();
            ctx.closePath();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = '#FFFFFF';
            for(var i = 0; i < this.pointsArr.length; i){
                ctx.moveTo(this.pointsArr[i++], this.pointsArr[i++]);
                ctx.lineTo(this.pointsArr[i++], this.pointsArr[i++]);
                ctx.lineTo(this.pointsArr[i++], this.pointsArr[i++]);
                ctx.lineTo(this.pointsArr[i++], this.pointsArr[i++]);
                ctx.lineTo(this.pointsArr[i-8], this.pointsArr[i-7]);
            };
            ctx.fill();
            ctx.closePath();
            ctx.restore();
            /*
            ctx.save();
            ctx.translate(320, 240);
            ctx.rotate(-Math.PI / 2);
            ctx.translate(-240, -320);
            ctx.beginPath();
            ctx.strokeStyle = "#00ff00";
            for (var d = this.parts.length - 2; d >= 0; d--) {
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

            ctx.restore();*/
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