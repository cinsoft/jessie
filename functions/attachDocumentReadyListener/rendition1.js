/*global isHostMethod,global */

/*
Description:
Relies on `window.addEventListener` which degrades in IE8-

Best used with asset-light documents.

Note: No frames or other alternate windows
*/

var attachDocumentReadyListener;

var readyListenerAttached;

if(isHostMethod(global, "addEventListener")) {
	attachDocumentReadyListener = function(fn) {
		
		// Remove this "scaffolding" on deployment
		if(readyListenerAttached) {
			throw new Error("One too many ready listeners. Use a queue!");
		}
		readyListenerAttached = true;
		
		// Production function starts (and ends) here
		window.addEventListener('load', fn, false);
	};
}