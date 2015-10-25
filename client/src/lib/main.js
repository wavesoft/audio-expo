/**
 * Define packages
 */
require.config({
	
	packages: [
		{
			'name'		: 'jquery',
			'location'	: 'lib/jquery/js',
			'main'		: 'jquery-2.1.4.min'
		},
		{
			'name'		: 'three',
			'location'	: 'lib/three/js',
			'main'		: 'three-0.72.0.min'
		},
		{
			'name'		: 'three-extras',
			'location'	: 'lib/three-extras/js'
		},
		{
			'name'		: 'three-bundles',
			'location'	: 'lib/three-bundles/js'
		},
		{
			'name'		: 'buzz',
			'location'	: 'lib/buzz/js',
			'main'		: 'buzz-1.1.10.min'
		},
		{
			'name'		: 'webaudiox',
			'location'	: 'lib/webaudiox/js',
			'main'		: 'webaudiox'
		},
	],

});
