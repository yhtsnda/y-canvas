var EventSystem = {
		//blur focus focusin focusout load resize scroll unload click dblclick
		//mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave
		//change select submit keydown keypress keyup error contextmenu
		//touchstart touchmove touchend touchcancel
		eventsType:[
			["mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave"],
			["keydown", "keypress", "keyup"],
			["touchstart", "touchmove", "touchend", "touchcancel"]
		];
	};
EventSystem.initial = function () {
    var MOUSEEVTINDEX = 0,
		KEYBOARDEVTINDEX = 1,
		TOUCHEVTINDEX = 2;
    
	var gainEvent = {
		'mouse':function(e){
			this.events[MOUSEEVTINDEX].some(function(event,index,originalE){
				if(event.type === e.type){
					originalE = null;
				}
			});
			this.events[MOUSEEVTINDEX].removeNullVal();
            e.absolutePosition = {
                x : e.offsetX ? e.offsetX : e.layerX,
                y : e.offsetY ? e.offsetY : e.layerY
            };
			this.events[MOUSEEVTINDEX].push(e);
		},
		'key':function(e){
			//var code = e.keyCode || e.which;
            
            //_addEvent(me._keyboardEvents, e);
			Debugger.error('this function need to be implmented');
		},
		'touch':function(e){
			this.events[TOUCHEVTINDEX].some(function(event,index,originalE){
				if(event.type === e.type){
					originalE = null;
				}
			});
			this.events[TOUCHEVTINDEX].removeNullVal();
            e.absolutePosition = {
                x : e.touches[0].clientX,
                y : e.touches[0].clientY
            };
			this.events[TOUCHEVTINDEX].push(e);
		}
	};
    function _gainEvent(e) {
        if (!e || me.deallingEvents())
            return;
		for(var prop in gainEvent){
			if(e.type.indexOf(prop) == 0){
				gainEvent[prop].call(me,e);
				break;
			}
		}
    }
    
	this.eventsType.forEach(function(eventTypes){
		eventTypes.forEach(function(eventType){
			addEventHandler(getDom(), eventType, _gainEvent);
		});
	});
};
EventSystem.removeEvent = function (e) {
	this.events().some(function(eventsArray,index,events){
		return eventsArray.some(function(event,index,originalEventsArray){
			if(event === e){
				originalEventsArray.splice(index,1);
				return true;
			}
		});
	});
};
EventSystem.events = function(events){
	return events?(this._events = events):this._events;
};
EventSystem.deallingEvents = function(inDealling){
	return inDealling == null ? this._inDealingEvents : (this._inDealingEvents = inDealling);
};
EventSystem.resetEvents = function () {
    this.events([[],[],[]]);
	this.deallingEvents(false);
};
