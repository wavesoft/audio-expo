

define(["three"], function(THREE) {

	/**
	 * Create an experiment base class
	 */
	var ExperimentBase = function() {

		/**
		 * The scene property is the root object tree
		 * for this scene.
		 */
		this.scene = new THREE.Object3D();

		/**
		 * The lights array contains all the light objects
		 * in the scene.
		 */
		this.lights = [];
	}

	/**
	 * Overridable function to handle interface updates
	 */
	ExperimentBase.prototype.update = function( delta ) {
	}

	/**
	 * Overridable function to load experiment resources 
	 */
	ExperimentBase.prototype.load = function( callback ) {
		callback(true);
	}

	// Return experiment base class
	return ExperimentBase;

});