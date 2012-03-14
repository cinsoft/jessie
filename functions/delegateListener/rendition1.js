var delegateListener;

if(attachListener && getEventTarget) {
	delegateListener = function(el, eventType, fn, fnDelegate) {
		
		var listener = function(e) {			
			if(fnDelegate(getEventTarget(e))) {
				fn.call(e);
			}
		};
		
		attachListener(el, eventType, listener);
		
		return listener;
	};
}