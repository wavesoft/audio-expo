

define([ "jquery", "./viewport", "./audiolib" ], function($, Viewport, AudioLibrary ) {

	/**
	 * The render manager takes care of managing rendering
	 * components and resources.
	 */
	var RenderManager = function() {

		/**
		 * @property The viewport object
		 */
		this.viewport = null;

		/**
		 * @property The audio library
		 */
		this.audio = new AudioLibrary();

		// ==== DEBUG =====
		window.m = this;
		// ================

	}

	/**
	 * Create and define viewport
	 */
	RenderManager.prototype.createViewport = function ( viewportDOM ) {

		// Create a new viewport instance
		this.viewport = new Viewport(viewportDOM);

		// Configure
		this.viewport.setPaused(false);
		this.viewport.setHMD(true);

	}

	// Return render manager singleton
	return new RenderManager();

});