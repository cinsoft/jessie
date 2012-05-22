/*global canCall */

/*
Description:
Relies on `unction.prototype.bind`
*/
var bind;

if(canCall && Function.prototype.bind){
    bind = function(fn, thisObject) {
        return fn.bind.apply(fn, Array.prototype.slice.call(arguments, 1));
    };
}