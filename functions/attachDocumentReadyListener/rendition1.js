/*global isHostMethod,global */

/*
Description:
Relies on `window.addEventListener`

Best used with asset-light documents.

Note: No frames or other alternate windows
*/

/*
Degrades:
IE8
*/

var attachDocumentReadyListener;

var readyListenerAttached;

if(isHostMethod(global, "addEventListener")) {
	attachDocumentReadyListener = function(fn) {
		
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