/*global html,isHostObjectProperty,isHostMethod */

/*
Description:
Relies on the `el.classList.add`
*/

/*
Support:
Chrome
*/

var addClass;

if (html && isHostObjectProperty(html, "classList") && isHostMethod(html.classList, "add") ) {
	addClass = function(el, className) {
		return el.classList.add(className);
	};
}