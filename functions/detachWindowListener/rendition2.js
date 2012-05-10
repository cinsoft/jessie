/*global detachWindowListener:true,global,isHostMethod */

if(global && isHostMethod(global, 'detachEvent')) {
	detachWindowListener = function(eventType, fn) {
		global.detachEvent('on'+eventType, fn);
	};
}