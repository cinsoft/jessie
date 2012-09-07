/*
Description:
For both W3C `e.target` and MS `e.srcElement`
*/

/*
See: <a href="https://groups.google.com/forum/#!starred/comp.lang.javascript/uUsSVH7Vcvg">Article</a>
If you will be using a forked rendition to support IE 8-
*/

/*
Degrades:
IE4, IE3, NN4
*/

var getEventTarget;

getEventTarget = function(e) {
	var target = e.target;
	if (target) {
		// Check if not an element (e.g. a text node)
		if (1 != target.nodeType) {
			// Set reference to parent node (which must be an element)
			target = target.parentNode;
		}
	} else {
		target = e.srcElement;
	}
	return target;
};