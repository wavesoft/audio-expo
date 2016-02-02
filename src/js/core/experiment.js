

var THREE = require("three-extras");

/**
 * Create an experiment base class
 *
 * @constructor 
 * @class ExperimentBase
 * @param {object} resources - The instances of all the requested resources
 */
var ExperimentBase = function( resources ) {

	/**
	 * The scene property is the root object tree
	 * for this scene.
	 *
	 * @property scene
	 */
	this.scene = new THREE.Object3D();

	/**
	 * The lights array contains all the light objects
	 * in the scene (excluding ambient light).
	 *
	 * @property lights
	 */
	this.lights = [];

	/**
	 * Skybox to use
	 */
	this.skybox = null;

	/**
	 * Ambient light to use
	 *
	 * @property ambient
	 */
	this.ambient = 0x000000;

	/**
	 * The bounding box of the scene
	 *
	 * this is used to enable experiment-specific environment
	 * or other elements
	 *
	 * @property bbox
	 */
	this.bbox = null;

}

/**
 * Overridable function to handle scene updates
 *
 * @param {int} delta - The number of millisecond since last call
 * @abstract
 */
ExperimentBase.prototype.onUpdate = function( delta ) { }

/**
 * Overridable function called when the experiment is activated
 * @abstract
 */
ExperimentBase.prototype.onActivate = function() { }

/**
 * Overridable function called when the experiment is de-activated
 * @abstract
 */
ExperimentBase.prototype.onDeactivate = function() { }

/**
 * Update the scene's bounding box
 */
ExperimentBase.prototype.updateBoundingBox = function() {
	// Re-generate bounding box
	this.bbox = new THREE.Box3().setFromObject( this.scene );
}

/**
 * Overridable function to load experiment resources 
 * 
 * @param {RenderManager} manager - A reference to the render manager from which resources can be managed
 * @param {function} callback - The function to call when loading is completed
 */
ExperimentBase.prototype.load = function( manager, callback ) {
	callback(true);
}

// Return experiment base class
module.exports = ExperimentBase;
