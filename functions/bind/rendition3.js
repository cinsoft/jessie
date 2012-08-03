/*global canCall */

/*
Description:
Relies on `Function.prototype.bind` and `Function.prototype.apply` and `Array.prototype.slice`
*/

/*
Degrades:
TBC but provides the greatest support
*/

/*
Degrades:
IE8, Chrome 6, Firefox 3.6, Safari 5.1, Opera 11.5
*/

var bind;

if(canCall && Function.prototype.bind){
	bind = function(fn, thisObject) {
		return fn.bind.apply(fn, Array.prototype.slice.call(arguments, 1));
	};
}
else if(canCall && Array.prototype.slice) {
	bind = function(fn, context) {
		var prependArgs = Array.prototype.slice.call(arguments, 2);

		if (prependArgs.length) {
			return function() {
				fn.apply(context, Array.prototype.concat.apply(prependArgs, arguments));
			};
		}
		return function() {
			fn.apply(context, arguments);
		};
	};

}