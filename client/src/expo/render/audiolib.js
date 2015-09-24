

define([ "buzz" ], function(buzz) {

	/**
	 * The audio library takes care of loading and processing
	 * audio elements in the interface.
	 */
	var AudioLibrary = function( progressManager ) {

		/**
		 * The progress manager to use to report loading events
		 * @property
		 */
		this.progressManager = progressManager;

	}

	/**
	 * Load a bulk of audio components
	 */
	AudioLibrary.prototype.load = function ( block ) {

	}

	// Return render manager singleton
	return AudioLibrary;

});