var app = new Application(document.getElementById('can')),
    loading = LoadingScene();
app.on('hello', function(){
    this.children.push(loading);
});
pubsub.pub('hello');
app.run();