

define(["jquery", "text!./html/launcher.html"], function($, template) {

	/**
	 * Launcher screen
	 */
	var Launcher = $( template );

	// Return the splash screen
	return Launcher;

});