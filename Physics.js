function Force(x, y, life) {
    this.value = prop(PointMake(x, y));
    this.life = life || Infinity;
}
Force.prototype.isActive = function () {
    if (this.life <= 0) {
        this.destory();
        return false;
    }
    this.update();
    return true;
};
Force.prototype.update = function () {};
//重力
function Gravity(value) {
    Force.call(this, 0, value, Infinity);
}
Gravity.prototype = new Force;
//布朗运动
function Brownian(maxValue, cycle, life) {
    Force.call(this, 0, 0, life);
    this.maxValue = maxValue;
    this.cycle = cycle;
    this.pastTime = 0;
    this.value().reset((Math.random() * 2 - 1) * this.maxValue, (Math.random() * 2 - 1) * this.maxValue);
}
Brownian.prototype = new Force;
Brownian.prototype.update = function () {
    this.pastTime += 0.004;
    if (this.pastTime >= this.cycle) {
        this.value().reset((Math.random() * 2 - 1) * this.maxValue, (Math.random() * 2 - 1) * this.maxValue);
        this.pastTime = 0;
    };
};
//吸附
function Attraction(attractionPosition, maxValue, r, life) {
    Force.call(this, 0, 0, life);
    this.maxValue = maxValue;
    this.r = r;
    this.attractionPosition = attractionPosition;
    this.target = null;
};
Attraction.prototype = new Force;
Attraction.prototype.update = function () {
    var d = this.attractionPosition.distanceTo(this.target.position());
    if (d < this.r) {
        this.value().sub(this.target.position(), this.attractionPosition);
        //this.value(this.target.position().diff(this.attractionPosition).multi(this.maxValue / (d||1)));
    } else {
        this.value().sub(this.attractionPosition, this.target.position());
        //this.value(this.attractionPosition.diff(this.target.position()).multi(this.maxValue / (d||1)));
    };
    this.value().multi2(this.maxValue / d);
};
//排斥
function Repulsion(repulsionPosition, maxValue, r, life) {
    Force.call(this, 0, 0, life);
    this.maxValue = maxValue;
    this.r = r;
    this.repulsionPosition = repulsionPosition;
    this.target = null;
};
Repulsion.prototype = new Force;
Repulsion.prototype.update = function () {
    var d = this.repulsionPosition.distanceTo(this.target.position());
    if (d > this.r) {
        this.value.reset(0, 0);
    } else {
        this.value(this.target.position().diff(this.repulsionPosition).multi(this.maxValue / (d || 1)));
    }
};
