// Degrades in IE 8- 
// Also degrades in some older browsers that lack this method on 
// window objects 
// No frames 

var attachWindowListener;

if(global && isHostmethod(global, 'addEventListener')) {
	attachWindowListener = function(eventType, fn) {
		// Remove this line on deployment -- for debugging only 
		if (!(/^(load|scroll|resize|orientationchange)$/.test(eventType))) { 
			throw new Error('Use attachListener with an element.'); 
		} 
		
		global.addEventListener(eventType, fn, false);
	};
};