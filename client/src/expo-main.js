
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
     * Mapping to other modules
     */
	map: {
		'*': {
			'text'		 : 'lib/require-text/js/text-2.0.14'
		},
	}

});

/**
 * Load library package and bootstrap exposition application
 */
requirejs(['lib'], function(lib) {
    requirejs(['expo']);
});
