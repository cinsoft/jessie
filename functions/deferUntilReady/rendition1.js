/*global isHostMethod,global */

/*
Description:
Relies on `window.addEventListener`

Best used with asset-light documents.

Note: No frames or other alternate windows
*/

/*
Degrades:
IE8, IE7, IE6, IE5.5, IE5, IE4, IE3
*/

var deferUntilReady;

var readyListenerAttached;

if(isHostMethod(global, "addEventListener")) {
	deferUntilReady = function(fn) {
		
		/*SCAFFOLDING:Start*/
		if(readyListenerAttached) {
			throw new Error("One too many ready listeners. Use a queue!");
		}
		/*SCAFFOLDING:End*/
		
		readyListenerAttached = true;
		
		// Production function starts (and ends) here
		window.addEventListener('load', fn, false);
	};
}