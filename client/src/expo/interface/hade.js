

define(["jquery"], function($) {

	/**
	 * HMD-Aware DOM Element
	 *
	 */
	var HADE = function() {

		// Keep a reference of the viewport
		this.viewport = null;
		this.useHMD = false;

		// The DOM element that hosts the UI
		this.hostDOM = $('<div class="hade"></div>');

		// Two mirrored elements
		this.leftHostDOM = $('<div class="hade-left"></div>').appendTo(this.hostDOM);
		this.leftDOM = $('<div class="content"></div>').appendTo(this.leftHostDOM);
		this.rightHostDOM = $('<div class="hade-right"></div>').appendTo(this.hostDOM);
		this.rightDOM = $('<div class="content"></div>').appendTo(this.rightHostDOM);

	}

	/**
	 * Enable or disable HMD rendering
	 */
	HADE.prototype.setContents = function( tree ) {

		// Flush both DOMs
		this.leftDOM.empty();
		this.rightDOM.empty();

		// Append DOM Tree to left & clone on right
		this.leftDOM.append( tree );
		this.rightDOM.append( tree.clone(true, true) );

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
	 * Define the viewport to use
	 * 
	 * @property {Viewport} viewport - The viewport where the content is rendered
	 */
	HADE.prototype.setViewport = function( viewport ) {

		// Embed hostDOM to the viewport
		viewport.viewportDOM.append( this.hostDOM );

		// Keep a reference of the viewport for resizing
		this.viewport = viewport;
		this.resize();

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