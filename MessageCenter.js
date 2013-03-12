var Handler = function (handler, target) {
    if (!handler || !(this instanceof Handler)) {
        return null;
    }
    this.handler = handler;
    this.target = target;
};
var MessageCenter = {
    topics : [],
    handlers : {},
    trigger : function (topic) {
		this.handlers[topic] && this.handlers[topic].forEach(function(handler,index){
			handler && handler.handler && handler.handler.call(handler.target);
		});
    },
    _existTopic : function (existedTopic) {
		//console.log(this.topics);
		//console.log(existedTopic);
		return this.topics.some(function(topic){
			return existedTopic === topic;
		});
    },
    _existHandler : function (topic, handler, target) {
		return this.handlers[topic] && this.handlers[topic].some(function(_handler){
			return _handler && _handler.handler === handler && _handler.target === target;
		})
    },
    onPublish : function (topic) {
        if (!topic) {
            return;
        }
        if (!this._existTopic(topic)) {
            this.topics.push(topic);
        }
        this.trigger(topic);
    },
    onSubscribe : function (topic, handler, target) {
        if (!topic) {
            return;
        }
        this.handlers[topic] || (this.handlers[topic] = []);
        if (!this._existHandler(topic, handler, target)) {
            this.handlers[topic].push(new Handler(handler, target));
        }
    },
    onUnSubscribe : function (target, topic, handler) {
        if (!target) {
            return;
        }
        if (topic && handler) {
			this.handlers[topic] && this.handlers[topic].forEach(function(_handler,index, handlers){
				if(_handler && _handler.handler === handler && _handler.target === target){
					handlers[index] = null;
				}
			});
			this.handlers[topic].removeNullVal();
			/*
            for (var p in this.handlers[topic]) {
                var existedHandler = this.handlers[topic][p];
                if (existedHandler.handler === handler && existedHandler.target === target) {
                    //this.handlers[topic][p] = null;
                    delete this.handlers[topic][p];
                    break;
                }
            }*/
        } else if (topic && !handler) {
			this.handlers[topic] && this.handlers[topic].forEach(function(_handler,index, handlers){
				if(_handler && _handler.target === target){
					handlers[index] = null;
				}
			});
			this.handlers[topic].removeNullVal();
			/*
            for (var p in this.handlers[topic]) {
                var existedHandler = this.handlers[topic][p];
                if (existedHandler.target === target) {
                    //this.handlers[topic][p] = null;
                    delete this.handlers[topic][p];
                    break;
                }
            }*/
        } else if (!topic && handler) {
            for (var _topic in this.handlers) {
				this.handlers[_topic] && this.handlers[_topic].forEach(function(_handler,index, handlers){
					if(_handler && _handler.target === target){
						handlers[index] = null;
					}
				});
				this.handlers[_topic].removeNullVal();
				/*
                for (var p in this.handlers[i]) {
                    var existedHandler = this.handlers[i][p];
                    if (existedHandler.handler === handler && existedHandler.target === target) {
                        //this.handlers[i][p] = null;
                        delete this.handlers[i][p];
                        break;
                    }
                }*/
            }
        } else if (!topic && !handler) {
            for (var _topic in this.handlers) {
				if(this.handlers.hasOwnProperty(_topic)){
					this.handlers[_topic] && this.handlers[_topic].forEach(function(_handler,index, handlers){
						if(_handler && _handler.target === target){
							handlers[index] = null;
						}
					});
					this.handlers[_topic].removeNullVal();
				}
				/*
                for (var p in this.handlers[i]) {
                    var existedHandler = this.handlers[i][p];
                    if (existedHandler.target === target) {
                        //this.handlers[i][p] = null;
                        delete this.handlers[i][p];
                        break;
                    }
                }*/
            }
        }
    },
    clearTopic : function (topic) {
		this.topics.forEach(function(_topic,index,topics){
			_topic === topic && (topics[index] = null);
		});
    },
    clearSubscribe : function (topic, handler) {
        for (var prop in this.handlers) {
			this.handlers[prop] && this.handlers[prop].forEach(function(_handler,index,handlers){
				if(_handler && _handler.handler === handler){
					handlers[index] = null;
				}
			});
			this.handlers[prop].removeNullVal();/*
            var handlers = this.handlers[f];
            for (i = 0; i < handlers.length; i++) {
                handlers[i] && handlers[i].handler === handler && (delete handlers[i]);
            }
            handlers && 0 == handlers.length && delete this.handlers[f];*/
        }
    }
};