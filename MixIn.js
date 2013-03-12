function MixIn(from,to){
	for(var prop in from){
		to[prop] = from[prop];
	}
}