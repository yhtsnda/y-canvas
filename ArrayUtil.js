Array.prototype.removeNullVal = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] === undefined || this[i] === null) {
            this.splice(i, 1);
        }
    }
    return this;
};

Array.prototype.empty = function(){
    this.length = 0;
    return this;
}