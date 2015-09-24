

define(["jquery"], function( $ ) {

	/**
	 * Experiment loader is used to fetch experiment description
	 * and initialize it's resources directly into the viewport.
	 */
	var ExperimentLoader = function( viewport ) {

	}

	/**
	 * Load an experiment package from URL
	 */
	ExperimentLoader.prototype.load = function( url ) {

		var promise = new ExperimentPromise();

		

		// Return an experiment promise
		return promise;

	};

	// Return experiment loader class
	return ExperimentLoader;

});