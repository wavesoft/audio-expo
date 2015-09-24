
define(["jquery", "expo/render/manager", "expo/test/experiment"], 
      function($, RenderManager, Experiment) {

	// Create a viewport DOM
	var bodyDOM = $("body"),
		viewportDOM = $('<div id="viewport"></div>').appendTo(bodyDOM);

	// Create viewport
	RenderManager.createViewport( viewportDOM );

	var x1 = new Experiment();
	RenderManager.viewport.addExperiment( x1 );

	// We are ready
	bodyDOM.removeClass("loading");

});