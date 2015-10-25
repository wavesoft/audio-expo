
define(['expo/config', 'expo/bundle/registry', 'expo/shared/monitor'], function(ExpoConfig, BundleRegistry, ProgressMonitor) {

	/**
	 * Bundle loader is responsible for loading bundles and their resources,
	 * including solving of their dependencies.
	 *
	 * @alias bundle/loader
	 */
	var BundleLoader = {

		/**
		 * Bundles in the queue pending loading
		 */
		'queue': 		[ ],

		/**
		 * Dictionary with all handled urls and/or bundles
		 */
		'__handled': 	{ },

		/**
		 * Callbacks waiting for bundle(s) to be loaded
		 */
		'callbacks': 	{ },

	};

	/**
	 * Continue loading next item in queue
	 *
	 */
	BundleLoader.__loadingStep = function() {

		// Shift next item from queue
		var item = this.queue.shift();
		if (!item) return;

		// Get URL
		var url = ExpoConfig.bundlePath + '/' + item.url,
			urlIndex = url + '/index.js';

		// Inform progress monitor that we will start loading
		ProgressMonitor.start( urlIndex );

		// Use Require.js to load the bundle index
		require( urlIndex, 

			// Success callback
			function( bundleIndex ) {



				// Inform progress monitor that the resource is loaded
				ProgressMonitor.complete( urlIndex );

			},

			// Error callback
			function(error) {

				// Inform progress monitor that an error occured on this resource
				ProgressMonitor.error( urlIndex );

			}

		);


	}

	/**
	 * Load a particular bundle by it's name
	 *
	 * This function will download the bundle index, it's
	 * dependant bundles and it's resources.
	 *
	 */
	BundleLoader.load = function(bundleName, cbReady, cbError) {

		// Handle bundles only once
		if (!__handled[bundleName]) return;
		__handled[bundleName] = true;

		// Put on queue
		this.queue.push({
			'url': bundleName
		});

	}

	// Return the bundle registry object
	return BundleLoader;

});