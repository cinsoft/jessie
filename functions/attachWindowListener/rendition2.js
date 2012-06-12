/*global global,isHostMethod */

/*
Description:
Relies on `window.attachEvent`
*/

/*
Degrades:
IE9+,Opera 8+,Chrome, FF, Safari
*/

var attachWindowListener;

if(global && isHostMethod(global, 'attachEvent')) {
	attachWindowListener = function(eventType, fn) {
		// Remove this line on deployment -- for debugging only
		if (!(/^(load|scroll|resize|orientationchange)$/.test(eventType))) {
			throw new Error('Use attachListener with an element.');
		}
		
		var listener = function() {
			var e = window.event;
			fn.call(e, e);
		};

		global.attachEvent('on'+eventType, listener);

		return listener;
	};
}