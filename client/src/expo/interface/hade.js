

define(["jquery"], function($) {

	/**
	 * HMD-Aware DOM Element
	 *
	 * This is a very simple DOM helper that renders DOM elements side-by-side
	 * when using in HMD mode.
	 *
	 */
	var HADE = function( viewport ) {

		// Keep a reference of the viewport
		this.viewport = viewport;
		this.useHMD = false;
		this.tree = null;

		// The DOM element that hosts the UI
		this.hostDOM = $('<div class="hade"></div>');

		// Two mirrored elements
		this.leftHostDOM = $('<div class="hade-left"></div>').appendTo(this.hostDOM);
		this.leftDOM = $('<div class="content"></div>').appendTo(this.leftHostDOM);
		this.rightHostDOM = $('<div class="hade-right"></div>').appendTo(this.hostDOM);
		this.rightDOM = $('<div class="content"></div>').appendTo(this.rightHostDOM);

		// // Synchronize right DOM with left
		// this.leftDOM.on("DOMSubtreeModified", (function(){ 
		// 	if (!this.tree) return;

		// 	// When anything from left DOM changes, clone the whole dom to the right DOM
		// 	this.rightDOM.empty();
		// 	this.rightDOM.append( this.tree.clone() );

		// }).bind(this));
		// this.leftDOM.on("DOMAttrModified", (function(e){ 

		// 	// Find the target element
		// 	window.e = e;
		// 	alert("happened!");

		// }).bind(this));

		// Embed hostDOM to the viewport
		viewport.viewportDOM.append( this.hostDOM );
		this.resize();

	}

	/**
	 * Enable or disable HMD rendering
	 */
	HADE.prototype.setContents = function( contents ) {

		// Flush both DOMs
		this.clearContents();

		// Add contents
		return this.addContents( contents );

	}

	/**
	 * Clear HMD contents
	 */
	HADE.prototype.clearContents = function( contents ) {

		// Flush both DOMs
		this.leftDOM.empty();
		this.rightDOM.empty();

		// Select both contents and return a unified selector
		// This can be used for updating both contents at once
		return this.hostDOM.find("div > .content");

	}

	/**
	 * Append HMD contents
	 */
	HADE.prototype.addContents = function( contents ) {

		// If contents is a string, convert to DOM element
		if (typeof(contents) == "string") contents = $(contents);

		// Append DOM contents to left & clone on right
		this.leftDOM.append( contents );
		this.rightDOM.append( contents.clone(true, true) );

		// Select both contents and return a unified selector
		// This can be used for updating both contents at once
		return this.hostDOM.find("div > .content");

	}

	/**
	 * Enable or disable HMD rendering
	 */
	HADE.prototype.setHMD = function( enabled ) {
		if (enabled) {

			// Enable HMD distortion and show right eye
			this.hostDOM.addClass("hmd");
			this.rightHostDOM.show();

		} else {

			// Disable HMD distorion and show only left eye, full-width
			this.hostDOM.removeClass("hmd");
			this.rightHostDOM.hide();

		}
	}

	/**
	 * Apply the changes from the viewport
	 */
	HADE.prototype.resize = function() {

		var width = $(this.viewport.viewportDOM).width(),
			height = $(this.viewport.viewportDOM).height();

		// Update sizes of all elements
		this.hostDOM.css({ "width": width, "height": height });
		this.leftHostDOM.css({ "width": width, "height": height });
		this.rightHostDOM.css({ "width": width, "height": height });

	}

	// Return on-screen display class
	return HADE;

});