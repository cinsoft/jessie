# Jessie

Lean, beautiful and smart

## User guides

### General information

Jessie has a flat API. It is simply a collection of functions where `jessie` is the default namespace* to attach those functions to so that they are not on the global object.

	jessie.attachListener
	jessie.getDescendantsByClassName
	jessie.ajax
	jessie.parseJson
	jessie.forEach

*You can replace `jessie` with any name you want giving you that extra personal touch for your custom build.

Additionally you can use the builder to choose which functions you want in your custom build for your library.

### Renditions

Each function has one or more renditions. Each rendition is based on feature detection, feature testing and the context of your application i.e. what type of application are you building and what browsers are you supporting. You need to think about which rendition suits your context best.

Let's take a look at an example function with particular renditions:

`jessie.attachListener` is a function to add event listeners to dom nodes. It (currently) has three renditions:

1. W3C compliant `el.addEventListener` 
2. Microsofts implementation `el.attachEvent`
3. A combination of #1 and #2

If you're building a mobile only site or a site that only has to work in Chrome or Safari etc then rendition #1 will be perfect.

If you're building an intranet site that only has to work in IE7 then you can use rendition #2.

If you're building a site for many browsers then you will choose rendition #3 which is a combination of rendition #1 and rendition #2.

### Dynamic API

Most of the jessie functions are dynamic. This means the calling application should check the functions existence before using them allowing the application to degrade (as if JavaScript was turned off). Let's take an example:

	if(jessie.attachListener && jessie.ajax) {
		// write an application that relies on (and uses) attachListener and ajax
	}

A positive side effect of this design is that you have two choices of what to do when a particular function is not supported in a particular browser:

1. Degrade gracefully
2. Simply create another rendition that allows that function to work in another set of browsers. 

There will be no change to the application code meaning Jessie can grow or shrink as your project requirements change. 

Peter Michaux has an excellent article based on this concept found [here](http://peter.michaux.ca/articles/cross-browser-widgets).

### Builder

The builder has been created using Node so you must install that first.

#### About the builder

If you have read the above you should understand how Jessie is designed and therefore understand how the builder needs to work; it takes a list of functions. Each function must specify which rendition to use. The builder will tell you if you're missing any dependencies. Then it will build the jessie.js file for you to your specific needs.

#### Using the builder

There are two ways in which you can use the builder:

1. Through the CLI
2. Through the web UI

##### Command line

Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -o, --output [file]  The file to output to (outputs to stdout by default)
    --minify             Minify the output using UglifyJS
    --namespace [name]   The name of the global variable to export

Example on Linux

	cd builder
	node command.js -o /path/to/jessie.js bind:1 attachListener:2 attachBoundListener:1 query:1 toArray:1

Example on Windows:

	cd builder
	node command.js getEventTarget:1 attachListener:2 delegateTagNameListener:1 > /path/to/jessie.js

##### Web UI

	cd builder
	node app.js

Now visit 127.0.0.1:1337 in your browser and you will be presented with a list of available functions (and renditions). Choose one rendition for every function you require and press "Download" and save the file.

### API documentation

Currently the documentation is very basic and the API could change for the better but for now this is what we have:

#### bind a function
	
	var boundFunction = jessie.bind(function() {}, this);

#### for each
	
	var arr = [];
	var context = this;
	jessie.forEach(arr, function(value, index, array) {

	}, context);	

#### attach event listener

	var listener = jessie.attachListener(el, "click", function(e) {
		jessie.cancelDefault(e);
		var target = jessie.getEventTarget(e);
	});

#### remove event listener
	
	var listener = jessie.attachListener(el, "click", function(e) {});
	jessie.detachListener(el, "click", listener);

#### attach window listener

	var listener = jessie.attachWindowListener("resize", function(e) {});

#### detach window listener
	
	var listener = jessie.attachWindowListener("resize", function(e) {});
	jessie.detachWindowListener("resize", listener);

#### add class to element

	jessie.addClass(el, "className");

#### remove class from element

	jessie.removeClass(el, "className");

#### check element has a class

	jessie.hasClass(el, "className"); // returns boolean

#### get element (by id)

	var el = jessie.getElement("id"); // returns element node

#### get element parent
	
	var parentEl = jessie.getElementParent(el);

#### get descendants by class name

	var descendants = jessie.getDescendantsByClassName(el, "className");

#### get descendants by tag name

	var descendants = jessie.getDescendantsByTagName(el, "span");

#### get ancestor by tag name

	var ancestor = jessie.getAncestorByTagName(el, "span");

#### get ancestor by class name

	var ancestor = jessie.getAncestorByClassNameName(el, "className");

#### get elements by selector

	var elements = jessie.query("ul li a.className");

#### check if an element is a descendant (child of) another element

	var isDescendant = jessie.isDescendant(parentEl, descendantEl);

#### get (inner) html

	var html = jessie.getHtml(el);

#### set (inner) html

	jessie.setHtml(el, "<p>injected</p>");

#### create element
	
	jessie.createElement("div");

#### ajax

	jessie.ajax("/some/url/", {
		method: "post",
		data: "key=value",
		success: function(responseText, xhr) {},
		fail: function(xhr) {}
	});

### mixin

	var target = { a: 1 };
	var source = { b: 2 };
	jessie.mixin(target, source); // target now has a property b with value 2

## Developer guides

To begin working on Jessie there are a few simple things you have to be aware of.

### Functions

You will most likely be contributing to a function. All functions can be found in their own folder under "functions" in the repo. Each function has a number of renditions.

### Type checking

When type-checking put the type on the left hand side. It doesn't read as well but we have a good reason. The reason is that typos that exclude the second "=" will fail immediately, rather than creating an assignment.

	"string" == typeof whatever // good

	typeof whatever == "string" // bad

### File naming

For now each rendition should be held in a file called rendition#.js. So for example inside the attachListener folder we have three renditions:

* rendition1.js
* rendition2.js
* rendition3.js

Note: The number is not a version - it is an ID to represent a particular rendition. Each rendition is suitable depending on context. More on this above under "User guides > Renditions".

### Rendition structure

There are coding conventions used for each rendition and it should look something like this:

	/*global html,isHostMethod*/
	/*
	Description:
	The description of the rendition
	*/

	var theNameOfTheFunction;

	if(/* some feature detection*/) {
		theNameOfTheFunction = function(param1, param2) {
			/* some implementation based on the feature detection */
		};
	}

So let's break this down slightly:

	/*global html,isHostMethod*/

This tells the builder and jslint what the dependencies are for the rendition.

	/*
	Description:
	The description of the rendition
	*/

This is exposed in the builder web UI giving a description of what features this rendition relies on and to what context it is best suited.

	var theNameOfTheFunction;

This names the function and will ultimately be called using `jessie.theNameOfTheFunction`. It is `undefined` by default and gets assigned a function in the event the feature detection was positive. This is why the API is dynamic and puts the developer in control as mentioned above.

	if(/* some feature detection*/) {
		theNameOfTheFunction = function(param1, param2) {
			/* some implementation based on the feature detection */
		};
	}

This part varies - sometimes it's one line for detection and sometimes it's more involved. The principle is you detect a particular feature and assign that implementation to the function name variable when the feature detection has passed.

### Find code and tips to help contribute

David Mark has put many tips on CLJ so search for "David Mark Tip" and start to add renditions.

* [Attaching and detaching event listeners](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/b94b12547ed572f8?hl=en&noredirect=true)
* [The load problem and related matters](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/6d5575fd79d1169d?hl=en&noredirect=true)
* [How to Create an XHR object](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/4323efb65cebb31e/a4f28c7fbe305bca?hl=en&lnk=gst&q=ow+to+Create+an+XHR)
* [Properties and attributes](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/838804e32224601f/502a23cab0057bcd?hl=en&lnk=gst&q=tip+of+the+day+david)
* [Adding and removing host objects](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/d1f64857442e3b10/3d3d3d0174a46bcb?hl=en&lnk=gst&q=tip+of+the+day+david)
* [How to measure element dimensions](https://groups.google.com/group/comp.lang.javascript/browse_thread/thread/24fd33cc9f206ea0/8c8397bebd0a0188?hl=en&lnk=gst&q=tip+of+the+day+david)

You can also use David's MyLibrary code for reference.