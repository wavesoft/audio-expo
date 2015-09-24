
define(["jquery", "expo/render/viewport", "expo/render/experiment"], function($, Viewport, Experiment) {

	// Create a viewport DOM
	var bodyDOM = $("body"),
		viewportDOM = $('<div id="viewport"></div>').appendTo(bodyDOM);

	// Create viewport
	var viewport = new Viewport( viewportDOM );

	var x1 = new Experiment();
	viewport.addExperiment( x1 );

	// Configure
	viewport.setPaused(false);
	viewport.setHMD(true);

	// We are ready
	bodyDOM.removeClass("loading");

});