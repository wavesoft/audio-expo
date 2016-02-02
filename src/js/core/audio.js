var WebAudiox = require("webaudiox");

/**
 * The audio manager takes care of loading and processing
 * audio elements in the interface.
 *
 * @class AudioManager
 * @constructor
 */
var AudioManager = function( progressManager ) {

	/////////////////////////////////////////////////////////////
	// Properties
	/////////////////////////////////////////////////////////////

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
	 * The line in from the user's microphone
	 * @property
	 */
	this.lineIn = null;

	/**
	 * The line out to the user's speakers
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

	/////////////////////////////////////////////////////////////
	// Constructor
	/////////////////////////////////////////////////////////////

	//
	// Test for various audio formats
	//

	var audio  = document.createElement("audio");
	if (typeof audio.canPlayType === "function") {
		if (audio.canPlayType("audio/ogg;codecs=vorbis") !== "") {
			this.audioSuffix = ".ogg";
		}
	}

	//
	// Open microphone input
	//

	// Handle user's positive response
	var handleStream = (function(stream) {
		// Create an AudioNode from the stream.
		this.lineIn = this.context.createMediaStreamSource( stream );
	}).bind(this);

	// Handle user's negative response
	var handleError = (function() {
		// Display error
		alert("Unable to open audio input stream!");
	}).bind(this);

	// Get user media
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia|| navigator.oGetUserMedia;
	navigator.getUserMedia( {audio:true}, handleStream, handleError );

}

/**
 * Load a the next item from stack
 */
AudioManager.prototype._loadNext = function () {

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
AudioManager.prototype.load = function ( url ) {

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
AudioManager.prototype.play = function ( buffer, loop ) {

	// init AudioBufferSourceNode
	var source = this.context.createBufferSource();
	source.buffer = buffer
	source.loop = (loop !== undefined) ? loop : false;
	source.connect( this.lineOut.destination );

	// start the sound now
	source.start(0);

}

/**
 * Mute or unmute all sounds
 */
AudioManager.prototype.setMute = function ( isMuted ) {

}

// Export render manager
module.exports = AudioManager;
