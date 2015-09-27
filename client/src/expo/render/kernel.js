

define([ "jquery", 
		 "./viewport", 
		 "./audiomanager", 
		 "./assetmanager",
		 "./progressmanager",
		 "expo/interface/launcher",
		 "expo/interface/progressbar",
		 "expo/interface/hade" ], 
	function($, 
		Viewport, 
		AudioManager, 
		AssetManager,
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

		/////////////////////////////////////////////////////////////
		// Properties
		/////////////////////////////////////////////////////////////

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
		this.audio = new AudioManager( this.progressManager );

		/**
		 * The asset manager and game-wide asset database
		 * @property audio
		 */
		this.assets = new AssetManager( this.progressManager, this.audio );

		/**
		 * The HMD-Aware DOM Element container for scene HTML 
		 * @property audio
		 */
		this.hade = new HADE( this.viewport );

		/**
		 * The game-wide progress bar in HADE
		 * @property audio
		 */
		this.progressbar = this.hade.addContents( ProgressBar ).find(".progressbar");

		/**
		 * The splash screen shown to the user when the app
		 * is not running.
		 *
		 * @property splash
		 */
		this.splash = LauncherScreen;

		/////////////////////////////////////////////////////////////
		// Constructor
		/////////////////////////////////////////////////////////////

		//
		// Initialize splash screen
		//
		viewportDOM.append( this.splash );

		// Bind on splash page buttons
		this.splash.find("#start-desktop").click((function(e) {
			this.startDesktop();
		}).bind(this));
		this.splash.find("#start-hmd").click((function(e) {
			this.startHMD();
		}).bind(this));

		//
		// Bind progress bar to the progress events
		//
		this.progressManager.onProgressBegin((function(message) {

			// Show bar
			this.progressbar.addClass("active");
			this.progressbar.find(".message").text(message);

		}).bind(this));
		this.progressManager.onProgressCompleted((function() {

			// Hide bar
			this.progressbar.removeClass("active");
			this.progressbar.find(".message").text("");

		}).bind(this));
		this.progressManager.onProgress((function( progress, message ) {

			// Update indicator
			this.progressbar.children(".indicator").css({
				width: (progress*100) + '%'
			});
			this.progressbar.find(".message").text(message);

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

		var fullscreen_handler = (function(e) {
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
		document.addEventListener("fullscreenchange", fullscreen_handler);
		document.addEventListener("webkitfullscreenchange", fullscreen_handler);
		document.addEventListener("mozfullscreenchange", fullscreen_handler);
		document.addEventListener("MSFullscreenChange", fullscreen_handler);

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
	 * Load an experiment from the specified URL
	 */
	ExpoKernel.prototype.loadExperiment = function( url ) {
		// Load experiment class through require.js
		require(url, (function(ExperimentClass) {
			// Load all the resources according to the
			// experiment specifications
			this.assets.loadAll( ExperimentClass.resources,
				// The experiment dependencies are resolved
				(function( resources ) {
					// Instance experiment and place it in viewport
					this.viewport.addExperiment(
							new ExperimentClass( resources )
						);
				}).bind(this)
			);
		}).bind(this));
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
	 * Start in non-HMD (Desktop) mode
	 *
	 * NOTE: This should be triggered through a user event in order
	 *       to enable full-screen.
	 */
	ExpoKernel.prototype.startDesktop = function() {

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