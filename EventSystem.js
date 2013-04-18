var EventSystem = {
    //blur focus focusin focusout load resize scroll unload click dblclick
    //mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave
    //change select submit keydown keypress keyup error contextmenu
    //touchstart touchmove touchend touchcancel
    eventsType : [
        ["mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave"],
        ["keydown", "keypress", "keyup"],
        ["touchstart", "touchmove", "touchend", "touchcancel"]
    ]
};
EventSystem.init = function () {
    var MOUSEEVTINDEX = 0,
    KEYBOARDEVTINDEX = 1,
    TOUCHEVTINDEX = 2;
    
    var gainEvent = {
        'mouse' : function (e) {
            this.events()[MOUSEEVTINDEX].some(function (event, index, originalE) {
                if (event.type === e.type) {
                    originalE = null;
                }
            });
            this.events()[MOUSEEVTINDEX].removeNullVal();
            e.absolutePosition = {
                x : e.offsetX != null ? e.offsetX : e.pageX - e.target.offsetLeft,
                y : e.offsetY != null ? e.offsetY : e.pageY - e.target.offsetTop
            };
            //console.log(e.absolutePosition);
            this.events()[MOUSEEVTINDEX].push(e);
        },
        'key' : function (e) {
            //var code = e.keyCode || e.which;
            
            //_addEvent(me._keyboardEvents, e);
            Debugger.error('this function need to be implmented');
        },
        'touch' : function (e) {
            this.events()[TOUCHEVTINDEX].some(function (event, index, originalE) {
                if (event.type === e.type) {
                    originalE = null;
                }
            });
            this.events()[TOUCHEVTINDEX].removeNullVal();
            var touch = e.touches[0];
            /*
            pageX:距页面左上顶点的距离
            clientX:距页面可见范围的左上顶点的距离
            screenX:距屏幕左上顶点的距离
            offsetX:IE特有,距当前事件元素的左上顶点的距离，不计算border，如果有border，点击border时的offsetX值可以为负值
            layerX:火狐特有,鼠标距离事件元素一直往上，找到position为absolute或relative的元素的左上顶点的距离,如果设置当前元素postion为absolute或relative，则值与layerX相同
             */
            e.absolutePosition = {
                x : touch ? (touch.pageX - touch.target.offsetLeft) : 0,
                y : touch ? (touch.pageY - touch.target.offsetTop) : 0
            };
            this.events()[TOUCHEVTINDEX].push(e);
        }
    };
    var me = this;
    function _gainEvent(e) {
        if (!e || me.deallingEvents())
            return;
        for (var prop in gainEvent) {
            if (e.type.indexOf(prop) == 0) {
                gainEvent[prop].call(me, e);
                break;
            }
        }
    }
    
    this.eventsType.forEach(function (eventTypes) {
        eventTypes.forEach(function (eventType) {
            addEventHandler(getDom(), eventType, _gainEvent);
        });
    });
    this.resetEvents();
};
EventSystem.removeEvent = function (e) {
    this.events().some(function (eventsArray, index, events) {
        return eventsArray.some(function (event, index, originalEventsArray) {
            if (event === e) {
                originalEventsArray.splice(index, 1);
                return true;
            }
        });
    });
};
EventSystem.events = (function () {
    var _events = [[], [], []];
    return function (events) {
        return events === undefined ? _events : _events = events;
    };
})();
EventSystem.deallingEvents = (function () {
    var _inDealingEvents;
    return function (inDealling) {
        return inDealling == null ? _inDealingEvents : _inDealingEvents = inDealling;
    };
})();
EventSystem.resetEvents = function () {
    this.events([[], [], []]);
    this.deallingEvents(false);
};
