/*global globalDocument,toArray,isHostMethod */

/*
Description:
Relies on 'document.getElementsByTagName'
*/

var getDescendantsByTagName;

if(globalDocument && isHostMethod(globalDocument, "getElementsByTagName") && toArray) {
	getDescendantsByTagName = function(el, tagName) {
		return toArray((el || document).getElementsByTagName(tagName));
	};
}