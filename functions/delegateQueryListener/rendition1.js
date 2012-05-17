/*global query,isDescendant,delegateListener,isInQuery */

var delegateQueryListener;

if(delegateListener && query && isInQuery && isDescendant) {
	delegateQueryListener = function(el, eventType, selector, fn) {

		var fnDelegate = function(target) {
			if(isInQuery(target, selector)) {
				return target;
			}
				
			// its not in query so loop through by selector
			// if the target is a child of the element then
			// return that element
			var elements = query(selector);
			for(var i = 0; i < elements.length; i++) {
				if( isDescendant(elements[i], target) ) {
					return elements[i];
				}
			}
		};

		return delegateListener(el, eventType, fn, fnDelegate);
	};
}