/*global html,isHostMethod */

/*
Description:
Relies on W3C compliant `e.preventDefault()`
*/

var cancelDefault;

if(html && isHostMethod(html, 'addEventListener')) {
	cancelDefault = function(e) {
		e.preventDefault();
	};
}