Array.prototype.removeNullVal = function(){
	for(var i=this.length;i>=0;i--){
		if(this[i] === undefined || this[i] === null){
			this.splice(i,1);
		}
	}
	return this;
};