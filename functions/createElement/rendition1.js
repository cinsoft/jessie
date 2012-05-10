/*global createElement:true,globalDocument,isHostMethod*/

if(globalDocument && isHostMethod(globalDocument, "createElement")) {
	createElement = function(tagName, doc) {
		return (doc || document).createElement(tagName);
	};
}