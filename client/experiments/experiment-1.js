define("experiment-1", ["three", "expo/experiment/base", "expo"], function(THREE, Experiment, Kernel) {

	/**
	 * Experiment constructor
	 */
	var FirstExperiment = function( resources ) {
		Experiment.call(this);

	};

	// Subclass from Experiment
	FirstExperiment.prototype = Object.create( Experiment );

	/**
	 * Scene resources
	 */
	FirstExperiment.resources = {

		// Images to loade
		'image': {

		},

		// Image cubes to load
		'imagecube': {

		},

		// Meshes to load (loader depends on extension)
		'mesh': {

		},

		// Materials to load
		'material': {

		},

		// Sounds to load
		'sound': {

		},

	};


	// 
	return FirstExperiment;

});