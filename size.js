function Size(w, h) {
    this.w = w;
    this.h = h;
}
Size.prototype = {
        reset : function (w, h) {
            this.w = w;
            this.h = h;
            return this;
        },
        equal: function(to){
                return this === to || (this.w === to.w && this.w === to.h);
        }
};
