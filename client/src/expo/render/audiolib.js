

define([ "buzz", "webaudiox" ], function( buzz, WebAudiox ) {

	/**
	 * The audio library takes care of loading and processing
	 * audio elements in the interface.
	 *
	 * @class AudioLibrary
	 * @constructor
	 */
	var AudioLibrary = function( progressManager ) {

		/**
		 * The progress manager to use to report loading events
		 * @property
		 */
		this.progressManager = progressManager;

		/**
		 * The web audio context
		 * @property
		 */
		this.context = new AudioContext()

		/**
		 * The line out
		 * @property
		 */
		this.lineOut = new WebAudiox.LineOut( this.context );

		/**
		 * File suffix (.mp3 or .ogg) depending on the browser support
		 * @property
		 */
		this.audioSuffix = ".mp3";

		/**
		 * Lookup dictionary with all loaded sounds
		 * @property
		 */
		this.soundBuffers = { };

		/**
		 * Stack of items pending loading
		 */
		this._loadingStack = [];

		/**
		 * Flag that denotes that loading is active
		 */
		this._loading = false;


		//
		// Test for various audio formats
		//

		var audio  = document.createElement("audio");
		if (typeof audio.canPlayType === "function") {
			if (audio.canPlayType("audio/ogg;codecs=vorbis") !== "") {
				this.audioSuffix = ".ogg";
			}
		}

	}

	/**
	 * Load a the next item from stack
	 */
	AudioLibrary.prototype._loadNext = function () {

		// Get next item or stop if nothing else to load
		var url = this._loadingStack.shift();
		if (!url) {
			this._loading = false;
			return;
		}

		// We are loading
		this._loading = true;

		// Load a sound and store it
		this.progressManager.message("Loading sounds");
		WebAudiox.loadBuffer( this.context, url, (function(buffer){

			// Mark progress item as completed
			this.progressManager.complete();

			// Store on sound buffer
			this.soundBuffers[url] = buffer;

			// Load next
			this._loadNext();

		}).bind(this), (function(error) {

			// An error occured
			alert(error);

		}).bind(this));

	}

	/**
	 * Load an audio component and make it available
	 * in the framework.
	 *
	 * @param {string} url - The URL of the audio file to load (without extension)
	 */
	AudioLibrary.prototype.load = function ( url ) {

		// Append browser-specific extension
		var fullURL = url + this.audioSuffix;

		// Check if this is already loaded
		if (this.soundBuffers[fullURL] !== undefined) return;

		// Check if this is pending loading
		if (this._loadingStack.indexOf(fullURL) >= 0) return;

		// Schedule for loading
		this._loadingStack.push(fullURL);
		this.progressManager.schedule();

		// Start loading process if not running
		if (!this._loading) this._loadNext();

	}

	/**
	 * Play a sound buffer
	 */
	AudioLibrary.prototype.play = function ( buffer, loop ) {

		// init AudioBufferSourceNode
		var source = this.context.createBufferSource();
		source.buffer = buffer
		source.loop = (loop !== undefined) ? loop : false;
		source.connect( this.lineOut.destination );

		// start the sound now
		source.start(0);

	}

	/**
	 * Pause all the currently playing sounds
	 */
	AudioLibrary.prototype.pause = function () {
	}

	/**
	 * Resume all the currently playing sounds
	 */
	AudioLibrary.prototype.resume = function () {
	}

	// Return render manager singleton
	return AudioLibrary;

});