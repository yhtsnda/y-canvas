var EventSystem = {
    //blur focus focusin focusout load resize scroll unload click dblclick
    //mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave
    //change select submit keydown keypress keyup error contextmenu
    //touchstart touchmove touchend touchcancel
    init: function() {
        var me = this,
            eventsType = [
                ["mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave"],
                ["keydown", "keypress", "keyup"],
                ["touchstart", "touchmove", "touchend", "touchcancel"]
            ],
            dom = getDom(),
            handler = proxy(me.filterEvent, me);

        eventsType.forEach(function(eventTypes) {
            eventTypes.forEach(function(eventType) {
                addEventHandler(dom, eventType, handler);
            });
        });
        this.resetEvents();
    },
    gainEvent: {
        'mouse': function(e) {
            e.position = {
                x: e.offsetX !== undefined ? e.offsetX : e.pageX - e.target.offsetLeft,
                y: e.offsetY !== undefined ? e.offsetY : e.pageY - e.target.offsetTop
            };
            this.events()[0].push(e);
        },
        'key': function(e) {
            //var code = e.keyCode || e.which;

            //_addEvent(me._keyboardEvents, e);
            Debugger.error('this function need to be implmented');
        },
        'touch': function(e) {
            var touch = e.touches[0];
            e.position = {
                x: touch ? (touch.pageX - touch.target.offsetLeft) : 0,
                y: touch ? (touch.pageY - touch.target.offsetTop) : 0
            };
            this.events()[2].push(e);
        }
    },
    filterEvent: function(e) {
        if (!e || this.deallingEvents())
            return;
        var match = e.type.match(/mouse|key|touch/);
        if (match) {
            this.gainEvent[match[0]].apply(this, arguments);
        }
    },/*
    removeEvent: function(e) {
        this.events().some(function(eventsArray, index, events) {
            return eventsArray.some(function(event, index, originalEventsArray) {
                if (event === e) {
                    originalEventsArray.splice(index, 1);
                    return true;
                }
            });
        });
    },*/
    events: prop([
        [],
        [],
        []
    ]),
    deallingEvents: prop(),
    resetEvents: function() {
        this.events([
            [],
            [],
            []
        ]);
        this.deallingEvents(false);
    },
    handleEventWithTarget: function(target) {
        //mouse event
        forEach(this.events()[0], function(event) {
            var pos = target.actualPosition();
            if (event.position.x >= pos.x &&
                event.position.x <= pos.x + target.width() &&
                event.position.y >= pos.y &&
                event.position.y <= pos.y + target.height()) {
                forEach(target['on' + event.type], function(handle) {
                    handle.call(target, event);
                });
            }
        });
        //key event
        forEach(this.events()[1], function(event) {});
        //touch event
        forEach(this.events()[2], function(event) {
            var pos = target.actualPosition();
            if (event.position.x >= pos.x &&
                event.position.x <= pos.x + target.width() &&
                event.position.y >= pos.y &&
                event.position.y <= pos.y + target.height()) {
                forEach(target['on' + event.type], function(handle) {
                    handle.call(target, event);
                });
            }
        });
    }
};