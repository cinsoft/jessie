/*global isHostMethod,global */

/*
Description:
For IE6 users that have updated their msxml dll files
*/

/*
Degrades:
IE6
*/

var createXhr;

if(isHostMethod(global, 'ActiveXObject')) {
	try {
		if(new global.ActiveXObject('Msxml2.XMLHTTP.6.0')) {
			createXhr = function() {
				return new global.ActiveXObject('Msxml2.XMLHTTP.6.0');
			};
		}
	}
	catch(e) {}
}