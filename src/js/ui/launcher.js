
var $ = require("jquery");
var template = require("html!html/launcher.html");

/**
 * Launcher screen
 */
var Launcher = $( template );

// Return the splash screen
module.exports = Launcher;
