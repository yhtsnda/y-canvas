function BaseObject(){}
BaseObject.prototype.publish = function(topic) {
    MessageCenter.onPublish(topic);
};
BaseObject.prototype.subscribe = function(topic, handler) {
    MessageCenter.onSubscribe(topic, handler, this);
};
BaseObject.prototype.unSubscribe = function(topic, handler) {
    MessageCenter.onUnSubscribe(this, topic, handler);
};
BaseObject.prototype.exec = function(functionName) {
    return this && this[functionName] && this[functionName](Array.prototype.slice.call(arguments,1));
};