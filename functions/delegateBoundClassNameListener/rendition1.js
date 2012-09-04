/*global global,isHostMethod,delegateBoundListener,hasClass,getElementParent*/

/*
Description:
Relies on `jessie.delegateBoundListener`, `jessie.hasClass`, and `jessie.getElementParent`
*/

var delegateBoundClassNameListener;

if(delegateBoundListener && hasClass && getElementParent) {
	delegateBoundClassNameListener = function(el, eventType, className, fn, thisObject) {

		var fnDelegate = function(el, target) {
			var currentTarget = target;

			if(el === currentTarget) {
				currentTarget = null;
			}

			// traverse up the tree until we find an element with the class or until we find the delegate/el
			while(currentTarget && (currentTarget !== el) && !hasClass(currentTarget, className)) {
				// if we clicked on the delegate/container/el then set to null
				currentTarget = getElementParent(currentTarget);
				if(el === currentTarget) {
					currentTarget = null;
				}
			}

			return currentTarget;
		};

		return delegateBoundListener(el, eventType, fn, fnDelegate, thisObject);
	};
}