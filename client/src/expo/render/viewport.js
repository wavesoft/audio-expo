

define(["three-extras", "jquery"], function(THREE, $) {

	/**
	 * Our viewport is where everything gets rendered
	 */
	var Viewport = function( viewportDOM, config ) {

		/////////////////////////////////////////////////////////////
		// Properties
		/////////////////////////////////////////////////////////////

		/////////////////////////////////////////////////////////////
		// Constructor
		/////////////////////////////////////////////////////////////

		// Initialize properties
		this.viewportDOM = $(viewportDOM);
		this.paused = true;
		this.useHMD = false;
		this.autoPause = true;
		this.experiments = [];

		// Initialize a THREE scene
		this.scene = new THREE.Scene();

		// Initialize a camera (with dummy ratio)
		this.camera = new THREE.PerspectiveCamera( 75, 1.0, 0.1, 1000 );

		// Set the initial location of the camera
		// (Virtual units assumed to be in meters)
		this.camera.position.x = -5.0;
		this.camera.position.z = 2.8;
		this.camera.lookAt( new THREE.Vector3( 0, 0, 2.8 ) );

		// Initialize the renderer
		this.renderer = new THREE.WebGLRenderer();
		this.viewportDOM[0].appendChild( this.renderer.domElement );

		// Initialize the effect
		this.hmdEffect = new THREE.OculusRiftEffect( this.renderer, { worldScale: 1 } );

		// Initialize the sizes (apply actual size)
		this.resize();

		// // Bind auto-pause event
		// var preBlurStatus = false;
		// $(window).blur((function() { 
		// 	// Keep the state before blur
		// 	preBlurStatus = this.paused;
		// 	// If not paused, paused
		// 	if (this.autoPause && !this.paused) 
		// 		this.setPaused(true); 
		// }).bind(this));
		// $(window).focus((function() {
		// 	// Return to the state before blur
		// 	if (this.autoPause && !this.paused) 
		// 		this.setPaused(preBlurStatus);
		// }).bind(this));

		// ==== DEBUG =====
		window.vp = this;
		// ================

	}

	/**
	 * Resize viewport to fit new size
	 */
	Viewport.prototype.resize = function() {

		// Get size of the viewport
		var width = this.viewportDOM.width(),
			height = this.viewportDOM.height();

		// Update camera
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();

		// Update effect
		this.hmdEffect.setSize( width, height );

		// Update renderer
		this.renderer.setSize( width, height );

		// Re-render if paused
		if (this.paused) this.render();

	}

	/**
	 * Render content
	 */
	Viewport.prototype.render = function() {

		// Schedule next frame if not paused
		if (!this.paused) requestAnimationFrame( this.render.bind(this) );

		// Get elapsed time to update animations
		var t = Date.now();
			d = t - this.lastTimestamp;
			this.lastTimestamp = t;
			
		// Perform scene updates only if not paused
		if (!this.paused) {

			// Update experiments
			for (var i=0; i<this.experiments.length; i++) {
				this.experiments[i].update( d );
			}

		}

		// Update controls
		// controls.update( this.clock.getDelta() );
		// oculuscontrol.update( this.clock.getDelta() );
			
		// Render scene
		if (this.useHMD) {
			this.hmdEffect.render( this.scene, this.camera );
		} else {
			this.renderer.render( this.scene, this.camera );
		}

	}

	/**
	 * Enable or disable automatic pausing when the window is not focused
	 */
	Viewport.prototype.setAutoPause = function( enabled ) {
		// Set the automatic pause enabled flag
		this.autoPause = enabled;
	}

	/**
	 * Enable or disable the Head-Mounted Display view
	 */
	Viewport.prototype.setHMD = function( enabled ) {
		// Set the HMD flag
		this.useHMD = enabled;
		// Resize
		this.resize();
	}

	/**
	 * Start or stop animation
	 */
	Viewport.prototype.setPaused = function( paused ) {

		// Start scene if paused
		if (this.paused && !paused) {
			this.paused = false;
			this.lastTimestamp = Date.now();
			this.render();

		// Pause scene if animating
		} else if (!this.paused && paused) {
			this.paused = true;

		}

	}

	/**
	 * Add an experiment to the viewport
	 */
	Viewport.prototype.addExperiment = function( experiment ) {
		this.experiments.push( experiment );

		// Add objects
		this.scene.add( experiment.scene );

		// Add lights
		for (var i=0; i<experiment.lights.length; i++) {
			this.scene.add( experiment.lights[i] );
		}

	}

	/**
	 * Remove an experiment to the viewport
	 */
	Viewport.prototype.removeExperiment = function( experiment ) {

	}

	// Return viewport class
	return Viewport;

});