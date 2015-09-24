

define(["jquery", "text!./html/progressbar.html"], function($, template) {

	/**
	 * Game-wide progress bar
	 */
	var ProgressBar = $( template );

	// Return the splash screen
	return ProgressBar;

});