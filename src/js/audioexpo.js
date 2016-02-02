var $ = require("jquery");
var Kernel = require("./core/kernel");
var Experiment = require("./examples/experiment");

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
