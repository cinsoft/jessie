//For browsers without native
var forEach;
if (Function.prototype.call) {
    forEach = function(elements, callback, thisObject) {
		for (var i = 0, l = elements.length; i < l; i++) {
			callback.call(thisObject, elements[i], i, elements);
		}
	}
}