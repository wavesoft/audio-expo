
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

});

/**
 * Load library package and bootstrap exposition application
 */
requirejs(['lib'], function(lib) {
    requirejs(['expo']);
});
