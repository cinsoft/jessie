/*global global*/

/*
Description:
Relies on `window.page(X/Y)Offset
*/

var getViewportScrollPosition;

if('number' == typeof global.pageXOffset && 'number' == typeof global.pageYOffset ) {
	getViewportScrollPosition = function() {
		return [global.pageXOffset, global.pageYOffset];
	};
}