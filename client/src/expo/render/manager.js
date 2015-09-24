

define([ "jquery", "./viewport", "./audiolib", "./progressmanager", "expo/interface/hade" ], 
	function($, Viewport, AudioLibrary, ProgressManager, HADE ) {

	/**
	 * The render manager takes care of managing rendering
	 * components and resources.
	 */
	var RenderManager = function() {

		/**
		 * The viewport object
		 * @property viewport
		 */
		this.viewport = null;

		/**
		 * The progress manager
		 * @property
		 */
		this.progressManager = new ProgressManager();

		/**
		 * The audio library
		 * @property audio
		 */
		this.audio = new AudioLibrary( this.progressManager );

		/**
		 * The HMD-Aware Dom Element that renders the game menu
		 * @property audio
		 */
		this.hade = new HADE( this.viewport );

		// Resize all relevant components when window resizes
		$(window).resize((function() {

			// Update viewport first
			if (this.viewport) this.viewport.resize(); 

			// Update hade to fit
			this.hade.resize();

		}).bind(this));


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
		this.viewport.setPaused(false);

		// Update components that need a viewport
		this.hade.setViewport( this.viewport );

	}

	/**
	 * Enable or disable the Head-Mounted Display view in all relevant components
	 */
	RenderManager.prototype.setHMD = function( enabled ) {

		// Set HMD status of viewport
		this.viewport.setHMD( enabled );

		// Set HMD status on HADE
		this.hade.setHMD( enabled );

	}

	// Return render manager singleton
	return new RenderManager();

});