var Handler = function(handler, target) {
    if (!handler || !(this instanceof Handler)) {
        return null;
    }
    this.handler = handler;
    this.target = target;
};
var MessageCenter = {
    topics: [],
    handlers: {},
    trigger: function(topic) {
        var args = slice(arguments, 1);
        this.handlers[topic] && this.handlers[topic].forEach(function(handler, index) {
            handler && handler.handler && handler.handler.apply(handler.target, args);
        });
        return this;
    },
    _existTopic: function(existedTopic) {
        return this.topics.some(function(topic) {
            return existedTopic === topic;
        });
    },
    _existHandler: function(topic, handler, target) {
        return this.handlers[topic] && this.handlers[topic].some(function(_handler) {
            return _handler && _handler.handler === handler && _handler.target === target;
        });
    },
    onPublish: function(topic) {
        if (!topic) {
            return;
        }
        if (!this._existTopic(topic)) {
            this.topics.push(topic);
        }
        this.trigger.apply(this, arguments);
        return this;
    },
    onSubscribe: function(topic, handler, target) {
        if (!topic) {
            return this;
        }
        this.handlers[topic] || (this.handlers[topic] = []);
        if (!this._existHandler(topic, handler, target)) {
            this.handlers[topic].push(new Handler(handler, target));
        }
        return this;
    },
    onUnSubscribe: function(target, topic, handler) {
        if (!target) {
            return this;
        }
        if (topic && handler) {
            if (this.handlers[topic]) {
                this.handlers[topic].forEach(function(_handler, index, handlers) {
                    if (_handler && _handler.handler === handler && _handler.target === target) {
                        handlers[index] = null;
                    }
                });
                this.handlers[topic].removeNullVal();
            }
        } else if (topic && !handler) {
            if (this.handlers[topic]) {
                this.handlers[topic].forEach(function(_handler, index, handlers) {
                    if (_handler && _handler.target === target) {
                        handlers[index] = null;
                    }
                });
                this.handlers[topic].removeNullVal();
            };
        } else if (!topic && handler) {
            for (var _topic in this.handlers) {
                if (this.handlers[_topic]) {
                    this.handlers[_topic].forEach(function(_handler, index, handlers) {
                        if (_handler && _handler.target === target) {
                            handlers[index] = null;
                        }
                    });
                    this.handlers[_topic].removeNullVal();
                }
            }
        } else if (!topic && !handler) {
            for (var _topic in this.handlers) {
                if (this.handlers.hasOwnProperty(_topic)) {
                    if (this.handlers[_topic]) {
                        this.handlers[_topic].forEach(function(_handler, index, handlers) {
                            if (_handler && _handler.target === target) {
                                handlers[index] = null;
                            }
                        });
                        this.handlers[_topic].removeNullVal();
                    }
                }
            }
        }
        return this;
    },
    clearTopic: function(topic) {
        this.topics.forEach(function(_topic, index, topics) {
            _topic === topic && (topics[index] = null);
        });
        return this;
    },
    clearSubscribe: function(topic, handler) {
        for (var prop in this.handlers) {
            if (this.handlers[prop]) {
                this.handlers[prop].forEach(function(_handler, index, handlers) {
                    if (_handler && _handler.handler === handler) {
                        handlers[index] = null;
                    }
                });
                this.handlers[prop].removeNullVal();
            }
        }
        return this;
    }
};