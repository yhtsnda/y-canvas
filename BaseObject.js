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
    return this && this[functionName] && (arguments.length > 1 ? this[functionName].apply(this, Array.prototype.slice.apply(arguments, 1)) : this[functionName].apply(this)); // !== undefined && args !== null && Array.prototype.slice.call(args));
};