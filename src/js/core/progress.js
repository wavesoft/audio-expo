var $ = require("jquery");

/**
 * This class ban be used to manage progress events
 *
 * @class ProgressFeedback
 * @constructor
 *
 */
var ProgressFeedback = function() {

	/////////////////////////////////////////////////////////////
	// Properties
	/////////////////////////////////////////////////////////////

	/**
	 * Items pending progress
	 *
	 * @property pendingItems
	 */
	this.pendingItems = 0;

	/**
	 * Items completed
	 *
	 * @property pendingItems
	 */
	this.completedItems = 0;

	/**
	 * Listeners for the progress event
	 */
	this.progressListeners = [];

	/**
	 * Listeners for the beginProgress event
	 */
	this.beginListeners = [];

	/**
	 * Listeners for the completeProgress event
	 */
	this.completeListeners = [];

	/**
	 * Last message when no new message exists
	 */
	this.lastMessage = "";

}

/**
 * Bind a listener for the progress event
 *
 * @param {function} callback - The function to call on progress events
 */
ProgressFeedback.prototype.onProgress = function(callback) {
	this.progressListeners.push( callback );
}

/**
 * Bind a listener for the progressBegin event
 *
 * @param {function} callback - The function to call when progress starts
 */
ProgressFeedback.prototype.onProgressBegin = function(callback) {
	this.beginListeners.push( callback );
}

/**
 * Bind a listener for the progressCompleted event
 *
 * @param {function} callback - The function to call when progress completes
 */
ProgressFeedback.prototype.onProgressCompleted = function(callback) {
	this.completeListeners.push( callback );
}

/**
 * Just send a message without any progress update
 *
 * @param {string} message - The message associated with them
 */
ProgressFeedback.prototype.message = function ( message ) {

	// Only if we are not completed
	if (this.pendingItems == this.completedItems) return;
	if (message) this.lastMessage = message;

	// Fire progress handlers
	for (var i=0; i<this.progressListeners.length; i++)
		this.progressListeners[i]( this.completedItems / this.pendingItems, this.lastMessage );

}

/**
 * Inform that one or more item(s) are scheduled for loading
 *
 * @param {int} tasks - The number of tasks being started
 * @param {string} message - The message associated with them
 */
ProgressFeedback.prototype.schedule = function ( tasks, message ) {

	// Apply defaults
	if (tasks == undefined) {
		tasks = 1; message = "";
	} else if (typeof(tasks) == "string") {
		message = tasks; tasks = 1;
	}
	if (message) this.lastMessage = message;

	// Check if that's the first event
	var isFirst = (this.pendingItems == this.completedItems);

	// Update number of pending tasks
	this.pendingItems += tasks;

	// Fire progress handlers
	for (var i=0; i<this.progressListeners.length; i++)
		this.progressListeners[i]( this.completedItems / this.pendingItems, this.lastMessage );

	// Trigger beginhandlers if that was the first
	if (isFirst) {
		for (var i=0; i<this.beginListeners.length; i++)
			this.beginListeners[i](this.lastMessage);
	}
}

/**
 * Inform that one or more item(s) have completed oading
 *
 * @param {int} tasks - The number of tasks being started
 * @param {string} message - The message associated with them
 */
ProgressFeedback.prototype.complete = function ( tasks, message ) {

	// Apply defaults
	if (tasks == undefined) {
		tasks = 1; message = "";
	} else if (typeof(tasks) == "string") {
		message = tasks; tasks = 1;
	}
	if (message) this.lastMessage = message;

	// Update number of completed tasks
	this.completedItems += tasks;
	if (this.completedItems > this.pendingItems)
		this.completedItems = this.pendingItems;

	// Fire progress handlers
	for (var i=0; i<this.progressListeners.length; i++)
		this.progressListeners[i]( this.completedItems / this.pendingItems, this.lastMessage );

	// Check for completion
	if (this.completedItems == this.pendingItems) {

		// Trigger callbacks
		for (var i=0; i<this.completeListeners.length; i++)
			this.completeListeners[i]("");

		// Reset properties
		this.completedItems = 0;
		this.pendingItems = 0;
		this.lastMessage = "";

	}

}

// Return render manager singleton
module.exports = ProgressFeedback;
