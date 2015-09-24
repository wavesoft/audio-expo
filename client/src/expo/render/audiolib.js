

define([ "buzz" ], function(buzz) {

	/**
	 * The audio library takes care of loading and processing
	 * audio elements in the interface.
	 */
	var AudioLibrary = function() {

		/**
		 * @property The viewport object
		 */
		this.viewport = null;

	}

	/**
	 * Load a bulk of audio components
	 */
	AudioLibrary.prototype.load = function ( block ) {

	}

	// Return render manager singleton
	return AudioLibrary;

});