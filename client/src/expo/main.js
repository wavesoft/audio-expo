
define(["jquery", "expo/render/kernel", "expo/test/experiment", "three-bundles"], 
      function($, Kernel, Experiment) {

	// Create a viewport DOM
	var bodyDOM = $("body"),
		viewportDOM = $('<div id="viewport"></div>').appendTo(bodyDOM);

	// Create viewport
	var kernel = new Kernel( viewportDOM );

	// Load a dummy experiment
	var x1 = new Experiment();
	kernel.viewport.addExperiment( x1 );

	// We are ready
	bodyDOM.removeClass("loading");

	// Return expo API
	return kernel;

});