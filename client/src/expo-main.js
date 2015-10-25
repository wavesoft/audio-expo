
/**
 * Configure require.js
 */
requirejs.config({

	/**
	 * Everything is located in the 'src' folder
	 */
	'baseUrl': 'src',

	/**
	 * Preload libraries
	 */
	'packages': [
		'lib',
		'expo'
	],

    /**
     * Global configuration
     */
	config: {
		'waitSeconds'	: 20
	},

	/**
	 * Three Bundles
	 */
	threeBundles: {

		/**
		 * Three.JS Bundles are loaded from the experiments folder
		 */
		'baseUrl': '../experiments'

	},

    /**
     * Mapping to other modules
     */
	map: {
		'*': {

			// Core Plugins
			'text'		 : 'lib/require-text/js/text-2.0.14',

			// // Three Bundles 
			// 'bundle'	 : 'lib/three-bundles/js/plugin/bundle',
			// 'material'	 : 'lib/three-bundles/js/plugin/material',
			// 'mesh'		 : 'lib/three-bundles/js/plugin/mesh',
			// 'object'	 : 'lib/three-bundles/js/plugin/object',
			// 'geometry'	 : 'lib/three-bundles/js/plugin/geometry',
			// 'scene'		 : 'lib/three-bundles/js/plugin/scene',
			// 'shader'	 : 'lib/three-bundles/js/plugin/shader',
			// 'sound'		 : 'lib/three-bundles/js/plugin/texture',
			// 'texture'	 : 'lib/three-bundles/js/plugin/texture',

		},
	}

});

/**
 * Load library package and bootstrap exposition application
 */
requirejs(['lib'], function(lib) {
    requirejs(['expo']);
});
