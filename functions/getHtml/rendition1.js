/*global getHtml:true,html */

// See: https://groups.google.com/forum/#!search/david$20mark$20innerHTML/comp.lang.javascript/QQ9ClOT6igQ/LIZ5QXmmuw0J

if(html && "string" == typeof html.innerHTML) {
	getHtml = function(el) {
		return el.innerHTML;
	};
}