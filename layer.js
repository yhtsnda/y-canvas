function Layer() {
    Node.apply(this, arguments);
}
Layer.prototype = mix(Node.prototype, {
    update: function(context) {
        this.handleEvent(context);
        this.updateAction(context);
        this.updateChildren(context);
        this.render(context);
    },
    handleEvent: function() {
        EventSystem.handle(this);
    },
    updateAction: function(){
        exec(this.actionManager, 'update');
    },
    render: function(context) {
        exec(this._render, context);
    }
});
