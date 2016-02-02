
var $ = require("jquery");
var template = require("html!html/progressbar.html");

/**
 * Game-wide progress bar
 */
var ProgressBar = $( template );

// Return the splash screen
module.exports = ProgressBar;
