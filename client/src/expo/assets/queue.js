define([], function() {

	/**
	 * This class provides the core mechanism for scheduling
	 * resource downloads. In order to optimize download speed,
	 * it contains multuple sub-queues in order to group resources
	 * of the same type.
	 *
	 * @class Handles the sequencing for downloading resources
	 */
	var ResourceQueue = function() {

		/**
		 * The multiple sub-queues in the class
		 * @property {object}
		 */
		this.queues = { };

	};

	/**
	 * Fetch an item from the queue and handle it's behaviour
	 */
	ResourceQueue._popAndHandle = function( queueName ) {

		// Pop an item from the queue
		var item = this.queues[queueName].shift();

	}

	/**
	 * Schedule an action in the queue
	 */
	ResourceQueue.put = function( queueName ) {

	}

});