

define([ "jquery", 
		 "./viewport", 
		 "./audiolib", 
		 "./progressmanager",
		 "expo/interface/launcher",
		 "expo/interface/progressbar",
		 "expo/interface/hade" ], 
	function($, 
		Viewport, 
		AudioLibrary, 
		ProgressManager, 
		LauncherScreen, 
		ProgressBar,
		HADE
	) {

	/**
	 * This is the core class of the exposition that takes care of
	 * synchronizing the state of all the individual components that
	 * compose it.
	 *
	 * @constructor
	 * @class ExpoKernel
	 */
	var ExpoKernel = function( viewportDOM ) {

		/**
		 * The viewport object
		 * @property viewport
		 */
		this.viewport = new Viewport( viewportDOM );

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

		/**
		 * The game-wide progress bar
		 * @property audio
		 */
		this.progressbar = ProgressBar;
		viewportDOM.append( this.progressbar );

		/**
		 * The splash screen shown to the user when the app
		 * is not running
		 * @property splash
		 */
		this.splash = LauncherScreen;
		viewportDOM.append( this.splash );

		// Bind on splash page button events
		this.splash.find("#start-classic").click((function(e) {
			this.startClassic();
		}).bind(this));
		this.splash.find("#start-hmd").click((function(e) {
			this.startHMD();
		}).bind(this));

		/**
		 * Core event listeners
		 */

		//
		// Bind progress bar to the progress events
		//
		this.progressManager.onProgressBegin((function() {

			// Show bar
			this.progressbar.addClass("active");

		}).bind(this));
		this.progressManager.onProgressCompleted((function() {

			// Hide bar
			this.progressbar.removeClass("active");

		}).bind(this));
		this.progressManager.onProgress((function( progress ) {

			// Update indicator
			this.progressbar.children(".indicator").css({
				width: (progress*100) + '%'
			});

		}).bind(this));

		//
		// Resize all relevant components when window resizes
		//

		$(window).resize((function() {

			// Update viewport first
			if (this.viewport) this.viewport.resize(); 

			// Update hade to fit
			this.hade.resize();

		}).bind(this));

		//
		// Stop application when exits full-screen mode
		//

		var FShandler = (function(e) {
			if (
				document.fullscreenElement ||
				document.webkitFullscreenElement ||
				document.mozFullScreenElement ||
				document.msFullscreenElement
			) {
				// We are full screen
			} else {
				// We are not full screen
				this.stop();
			}

		}).bind(this);
		document.addEventListener("fullscreenchange", FShandler);
		document.addEventListener("webkitfullscreenchange", FShandler);
		document.addEventListener("mozfullscreenchange", FShandler);
		document.addEventListener("MSFullscreenChange", FShandler);

		// Wait when DOM is loaded and hit one render
		setTimeout((function() {
			this.viewport.render();
		}).bind(this), 500);

		// ==== DEBUG =====
		window.m = this;
		// ================

	}

	/**
	 * Enable or disable the Head-Mounted Display view in all relevant components
	 */
	ExpoKernel.prototype.setHMD = function( enabled ) {

		// Set HMD status of viewport
		this.viewport.setHMD( enabled );

		// Set HMD status on HADE
		this.hade.setHMD( enabled );

	}

	/**
	 * Stop everything and display menu screen
	 */
	ExpoKernel.prototype.stop = function() {

		// Disable HMD
		this.setHMD(false);

		// Pause viewport rendering
		this.viewport.setPaused( true );

		// Show splash
		this.splash.fadeIn();

	}

	/**
	 * Start in HMD mode
	 *
	 * NOTE: This should be triggered through a user event in order
	 *       to enable full-screen.
	 */
	ExpoKernel.prototype.startHMD = function() {

		// Hide splash
		this.splash.fadeOut();

		// Enable HMD & Start rendering
		this.setHMD(true);
		this.viewport.setPaused( false );

		// Request full screen
		var vpDOM = this.viewport.viewportDOM[0];
		if (vpDOM.requestFullscreen) {
			vpDOM.requestFullscreen();
		} else if (vpDOM.webkitRequestFullscreen) {
			vpDOM.webkitRequestFullscreen();
		} else if (vpDOM.mozRequestFullScreen) {
			vpDOM.mozRequestFullScreen();
		} else if (vpDOM.msRequestFullscreen) {
			vpDOM.msRequestFullscreen();
		}

	}

	/**
	 * Start in non-HMD mode
	 *
	 * NOTE: This should be triggered through a user event in order
	 *       to enable full-screen.
	 */
	ExpoKernel.prototype.startClassic = function() {

		// Hide splash
		this.splash.fadeOut();

		// Disable HMD & Start rendering
		this.setHMD(false);
		this.viewport.setPaused( false );

		// Request full screen
		var vpDOM = this.viewport.viewportDOM[0];
		if (vpDOM.requestFullscreen) {
			vpDOM.requestFullscreen();
		} else if (vpDOM.webkitRequestFullscreen) {
			vpDOM.webkitRequestFullscreen();
		} else if (vpDOM.mozRequestFullScreen) {
			vpDOM.mozRequestFullScreen();
		} else if (vpDOM.msRequestFullscreen) {
			vpDOM.msRequestFullscreen();
		}
	}

	// Return render manager singleton
	return ExpoKernel;

});