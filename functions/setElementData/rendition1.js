/*global html,isHostObjectProperty */

/*
 Description:
 Relies on el.dataset
 */

/*
 Degrades:
 IE11-, FF5-, Chrome 6-, Safari 5.0-, Opera 11.0-, iOS 4.3-, Android 2.3-
 */

/*
 Author:
 Graham Veal
 */

var setElementData;

if( html && isHostObjectProperty( html, "dataset" ) ){

	(function(){

		var reGetDashAndLetter = /-([a-z])/g;

		function convertDataName( match, letter ){

			return letter.toUpperCase();
		}

		setElementData = function( el, dataName, dataValue ){

			//convert the dataName to lowercase
			//then remove the dash and replace the character next to the dash with the upper case version
			dataName = dataName.toLowerCase().replace( reGetDashAndLetter, convertDataName );

			el.dataset[ dataName ] = dataValue;
		};
	}());
}