var getElementParent;
getElementParent = function(el) {
	return (el.parentNode && (el.parentNode.tagName || el.parentNode.nodeType == 1)) ? el.parentNode : (el.parentElement || null);
}