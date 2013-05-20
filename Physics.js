function Force(value, life) {
    this.value = prop(value);
    this.life = life || -1;
}
Force.prototype.isActive = function () {
    if (this.life <= 0) {
        this.destory();
        return false;
    }
    this.update();
    return true;
};
//重力
function Gravity(value) {
    Force.call(this, value);
}
//布朗运动
function Brownian(maxValue, cycle, life) {
    Force.call(this, 0, 0, life);
    this.maxValue = maxValue;
    this.cycle = cycle;
    this.pastTime = 0;
    this.value({
        x : (Math.random() * 2 - 1) * this.maxValue,
        y : (Math.random() * 2 - 1) * this.maxValue
    });
}
Brownian.prototype.update = function () {
    this.pastTime += SPP.frameTime;
    if (this.pastTime >= this.cycle) {
        this.value({
            x : (Math.random() * 2 - 1) * this.maxValue,
            y : (Math.random() * 2 - 1) * this.maxValue
        });
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
Attraction.prototype.update = function () {
    var d = this.attractionPosition.distanceTo(this.target.position());
    if (d < this.r) {
        this.value(this.target.position().sub(this.attractionPosition).multi(this.maxValue / d));
    } else {
        this.value(this.attractionPosition.sub(this.target.position())).multi(this.maxValue / d);
    };
};
function Repulsion(repulsionPosition, maxValue, r, life) {
    Force.call(this, 0, 0, life);
    this.maxValue = maxValue;
    this.r = r;
    this.repulsionPosition = repulsionPosition;
    this.target = null;
};
Repulsion.prototype.update = function () {
    var d = this.repulsionPosition.distanceTo(this.target.position());
    if (d > this.r) {
        this.value.reset(0, 0);
    } else {
        this.value(this.target.position().diff(this.repulsionPosition).multi(this.maxValue / d));
    }
};
