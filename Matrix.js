function Matrix(array) {
    var me = this;
    array.some(function(line){
        push(me,line);
    });
}
Matrix.prototype.multi = function (b) {
    for (i = 0; i < this.length; ++i) {
        for (k = 0; k < this.length; ++k) {
            var r = this[i][k];
            debugger
            for (j = 0; j < this.length; ++j) {
                this[i][j] += r * b[k][j];
            }
        }
    }
    return this;
};
Matrix.prototype.multiNew = function (b) {
    var c = new Matrix([]);
    for (i = 0; i < this.length; ++i) {
        for (k = 0; k < this.length; ++k) {
            r = this[i][k];
            for (j = 0; j < this.length; ++j) {
                c[i] = c[i] || [];
                c[i][j] += r * b[k][j];
            }
        }
    }
    return c;
};
