/*global isHostMethod,global,globalDocument */

/*
Description:
Relies on `window.addEventListener` and `document.addEventListener`

Note: No frames or other alternate windows.

Uses `DOMContentLoaded` as bonus so better for asset-heavy documents

Can use following to get IE8- to work when document is parsed:

		<script type="text/javascript">
			if ('function' == typeof readyListener) {
				window.setTimeout(readyListener, 1);
			}
		</script>
	</body>

*/
/*
Support:
IE8, Opera 7.6
*/

var attachDocumentReadyListener;

var readyListener,
	readyListenerAttached,
	documentIsReady;

if (isHostMethod(global, "addEventListener") && globalDocument && isHostMethod(globalDocument, "addEventListener")) {
	attachDocumentReadyListener = function(fn) {

		// Remove this "scaffolding" on deployment
		if (readyListenerAttached) {
			throw new Error('One too many ready listeners. Use a queue!');
		}

		readyListenerAttached = true;

		// Production function starts here

		// Run on first fired event
		readyListener = function() {
			if (!documentIsReady) {
				documentIsReady = true;
				fn();
			}
		};

		global.addEventListener('load', readyListener, false);
		globalDocument.addEventListener('DOMContentLoaded', readyListener, false);
	};
}