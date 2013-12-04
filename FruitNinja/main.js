define('fruit/main', ['application', 'pubsub', 'fruit/scene/loading'], function(App, pubsub, Loading) {
    var app = new App(document.getElementById('can')),
        loading = Loading();
    app.on('hello', function(){
        this.children.push(loading);
    });
    pubsub.pub('hello');
    app.run();
});