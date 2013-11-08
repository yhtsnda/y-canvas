define([], function(){
	console.log(new Date);
	define('a', [], function(){
		return 1;
	})

	define('b', [], function(){
		return 2;
	})

	define('c', [], function(){
		return 3;
	})
	console.log('after');
});
console.log('before');