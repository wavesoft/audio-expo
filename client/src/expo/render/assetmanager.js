
define(["three-extras", "jquery"], function(THREE, $) {

	/**
	 * The asset manager takes care of loading and processing
	 * visual assets in the interface.
	 *
	 * @class AssetManager
	 * @constructor
	 */
	var AssetManager = function( progressManager, audioManager ) {

		/////////////////////////////////////////////////////////////
		// Properties
		/////////////////////////////////////////////////////////////

		/**
		 * The underlaying THREE.js loading manager
		 * @property
		 */
		this.loadManager = new THREE.LoadingManager();

		/**
		 * The texture loader
		 * @property
		 */
		this.textureLoader = new THREE.TextureLoader( this.loadManager );

		/**
		 * The OBJ loader
		 * @property
		 */
		this.objLoader = new THREE.OBJLoader( this.loadManager );

		/**
		 * The asset loaders
		 * @property
		 */
		this.loaders = { };

		/////////////////////////////////////////////////////////////
		// Constructor
		/////////////////////////////////////////////////////////////

		// Bind on load manager events
		this.loadManager.onProgress = (function(item,loaded,total) {
			console.log( item, loaded, total );
		}).bind(this);

		//
		// Initialize texture loader
		//
		this.textureLoader = new THREE.TextureLoader();
		this.loaders.texture = (function( url, alias, callback ) {
			var scope = this;
			this.startLoading( url );
			this.textureLoader.load(
					// resource URL
					url,
					// Function when resource is loaded
					function ( texture ) {
						scope.endLoading( url );
						callback( texture, alias, 'image' );
					},
					// Function called when download progresses
					function ( xhr ) {
						scope.progressLoading( url, xhr.loaded / xhr.total );
					},
					// Function called when download errors
					function ( xhr ) {
						scope.errorLoading( url );
					}
				);
		}).bind(this);

		//
		// Initialize compressed texture loader
		//
		this.compressedTextureLoader = new THREE.CompressedTextureLoader();
		this.loaders.compressedTexture = (function( url, alias, callback ) {
			var scope = this;
			this.startLoading( url );
			this.compressedTextureLoader.load(
					// resource URL
					url,
					// Function when resource is loaded
					function ( texture ) {
						scope.endLoading( url );
						callback( texture, alias, 'image' );
					},
					// Function called when download progresses
					function ( xhr ) {
						scope.progressLoading( url, xhr.loaded / xhr.total );
					},
					// Function called when download errors
					function ( xhr ) {
						scope.errorLoading( url );
					}
				);
		}).bind(this);

		//
		// Initialize .obj file loader
		//
		this.meshLoaderOBJ = new THREE.OBJLoader();
		this.loaders.meshOBJ = (function( url, alias, callback ) {
			var scope = this;
			this.startLoading( url );
			this.meshLoaderOBJ.load(
					// resource URL
					url,
					// Function when resource is loaded
					function ( texture ) {
						scope.endLoading( url );
						callback( texture, alias, 'mesh' );
					},
					// Function called when download progresses
					function ( xhr ) {
						scope.progressLoading( url, xhr.loaded / xhr.total );
					},
					// Function called when download errors
					function ( xhr ) {
						scope.errorLoading( url );
					}
				);
		}).bind(this);

		//
		// Initialize .dae (collada) file loader
		//
		this.meshLoaderDAE = new THREE.ColladaLoader();
		this.loaders.meshDAE = (function( url, alias, callback ) {
			var scope = this;
			this.startLoading( url );
			this.meshLoaderDAE.load(
					// resource URL
					url,
					// Function when resource is loaded
					function ( texture ) {
						scope.endLoading( url );
						callback( texture, alias, 'mesh' );
					},
					// Function called when download progresses
					function ( xhr ) {
						scope.progressLoading( url, xhr.loaded / xhr.total );
					},
					// Function called when download errors
					function ( xhr ) {
						scope.errorLoading( url );
					}
				);
		}).bind(this);

	}

	/**
	 * Create a batch of load operations that has to be performed
	 */
	AssetManager.prototype.batch = function(  ) {

	}

	// Return asset manager class
	return AssetManager;

});