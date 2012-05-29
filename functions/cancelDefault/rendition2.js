/*global isHostMethod,html */

/*
Description:
Relies on MS event model `e.returnValue`
*/

/*
Support:
IE9+,Opera 8+,Chrome, FF, Safari
*/

var cancelDefault;

if(html && isHostMethod(html, 'attachEvent')) {
	cancelDefault = function(e) {
		e.returnValue = false;
	};
}