var EventSystem = function(){
    var eventTypes = [
        "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave",
        "keydown", "keypress", "keyup",
        "touchstart", "touchmove", "touchend", "touchcancel"
    ];
    return {
        init: function(dom) {
            for (var i = 0; i < eventTypes.length; i++) {
                dom.addEventListener(eventTypes[i], proxy(this.filterEvent, this));
            };
            this.reset();
        },
        gainEvent: {
            'mouse': function(e) {
                e.pos = {
                    x: e.offsetX !== undefined ? e.offsetX : e.pageX - e.target.offsetLeft,
                    y: e.offsetY !== undefined ? e.offsetY : e.pageY - e.target.offsetTop
                };
                this.events.mouse.push(e);
            },
            'key': function(e) {
                console.error('this function need to be implmented');
            },
            'touch': function(e) {
                var touch = e.touches[0];
                e.pos = {
                    x: touch ? (touch.pageX - touch.target.offsetLeft) : 0,
                    y: touch ? (touch.pageY - touch.target.offsetTop) : 0
                };
                this.events.touch.push(e);
            }
        },
        filterEvent: function(e) {
            if (!e || this.isBusy)
                return;
            var match = e.type.match(/mouse|key|touch/);
            if (match) {
                this.gainEvent[match[0]].apply(this, arguments);
            }
        },
        isBusy: false,
        events: {
            mouse: [],
            key: [],
            touch: []
        },
        reset: function() {
            this.events.mouse.length = 0;
            this.events.key.length = 0;
            this.events.touch.length = 0;
            this.isBusy = false;
            return this;
        },
        handle: function(target) {
            var pos = target.pos(),
                w = target.width,
                h = target.height;

            for (var i = 0; i < this.events.mouse.length; i++) {
                var event = this.events.mouse[i];
                if (event.pos.x >= pos.x &&
                    event.pos.x <= pos.x + w &&
                    event.pos.y >= pos.y &&
                    event.pos.y <= pos.y + h) {
                    var handle = target['on' + event.type];
                    for (var i = 0; i < handle.length; i++) {
                        handle[i].call(target, event);
                    };
                }
            }

            for (var i = 0; i < this.events.touch.length; i++) {
                var event = this.events.touch[i];
                if (event.pos.x >= pos.x &&
                    event.pos.x <= pos.x + w &&
                    event.pos.y >= pos.y &&
                    event.pos.y <= pos.y + h) {
                    var handle = target['on' + event.type];
                    for (var i = 0; i < handle.length; i++) {
                        handle[i].call(target, event);
                    };
                }
            }
            return this;
        }
    };
}();