function BaseObject() {}
BaseObject.prototype.publish = function (topic) {
    MessageCenter.onPublish(topic);
};
BaseObject.prototype.subscribe = function (topic, handler) {
    MessageCenter.onSubscribe(topic, handler, this);
};
BaseObject.prototype.unSubscribe = function (topic, handler) {
    MessageCenter.onUnSubscribe(this, topic, handler);
};
BaseObject.prototype.exec = function (functionName) {
    if (!this || !this[functionName]) {
        return;
    }
    if (arguments.length === 2 && Object.prototype.toString.call(arguments[1]) === '[object Arguments]') {
        this[functionName].apply(this, arguments[1]);
    } else if (arguments.length > 1) {
        this[functionName].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
        this[functionName]();
    }
};
BaseObject.prototype.execB = function (functionName, args) {
    return this && this[functionName] && this[functionName].apply(this, args);
};
