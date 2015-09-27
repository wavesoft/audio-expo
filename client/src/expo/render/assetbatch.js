
define(["three-extras", "jquery"], function(THREE, $) {

	/**
	 * A Batch of asset-loading operations, groupped in a single class
	 */
	var AssetBatch = function( manager ) {

		/////////////////////////////////////////////////////////////
		// Properties
		/////////////////////////////////////////////////////////////

		/**
		 * The parent asset manager to use for loading
		 * @property
		 */
		this.manager = manager;

		/**
		 * The requests pending in queue
		 */
		this.requests = [];

	}

	/**
	 * Load a texture from the specified URL
	 * and store it in the database under the specified alias.
	 *
	 * @param {string} url - The URL to load the texture image from
	 * @param {string} alias - The alias (ID) of the item in the database
	 * @param {string} type - The type of the image file if not auto-detected (one of 'png','jpg','gif','bmp','tga' or 'dds').
	 */
	AssetBatch.prototype.loadTexture = function( url, alias, type ) {

		// Get extension or pick type
		var ext = url.split("."); ext = ext[ext.length-1].toLowerCase();
		if (type !== undefined) ext = type;

		// Decide on the loader
		var loader;
		if (["jpg","jpeg","png","gif","tga","bmp"].indexOf(ext)) {
			loader = this.manager.loaders.texture;
		} else if (ext == "dds") {
			loader = this.manager.loaders.compressedTexture;
		} else {
			console.error("loadTexture: Unsuported image type '" + type + "'!");
		}

		// Place the request on manager
		this.requests.push({
			'loader': this.manager.loaders.texture,
			'url': url,
			'alias': alias
		});

	}

	/**
	 * Load multiple textures and store them in the database
	 *
	 * @example <caption>How to load multiple images</caption>
	 * batch.loadTextures({
	 *		'flower': 'assets/images/flower.jpg',
	 *		'box-df': 'assets/images/box-diffuse.dds',
	 *		'box-nm': 'assets/images/box-normal.dds',
	 * });
	 * @param {object} dict - An object that contains all the image URLs under the alias key
	 */
	AssetBatch.prototype.loadTextures = function( dict ) {
		for (var k in dict) {
		    if (!dict.hasOwnProperty(k)) continue;
		    this.loadTexture( dict[k], k );
		}
	}

	/**
	 * Load a mesh from the specified URL and store it in the 
	 * database under the specified alias.
	 *
	 * @param {string} url - The URL to load the mesh from
	 * @param {string} alias - The alias (ID) of the item in the database
	 * @param {string} type - The type of the mesh file if not auto-detected (one of 'obj','dae').
	 */
	AssetBatch.prototype.loadMesh = function( url, alias, type ) {

		// Get extension or pick type
		var ext = url.split("."); ext = ext[ext.length-1].toLowerCase();
		if (type !== undefined) ext = type;

		// Decide on the loader
		var loader;
		if (type == "obj") {
			loader = this.manager.loaders.meshOBJ;
		} else if (type == "dae") {
			loader = this.manager.loaders.meshDAE;
		} else {
			console.error("loadMesh: Unsuported mesh type '" + type + "'!");
		}

		// Place the request on manager
		this.requests.push({
			'loader': loader,
			'url': url,
			'alias': alias
		});

	}

	/**
	 * Load multiple image cubes and store them in the database
	 * @param {object} dict - An object that contains all the image URLs under the alias key
	 */
	AssetBatch.prototype.loadMeshes = function( dict ) {
		for (var k in dict) {
		    if (!dict.hasOwnProperty(k)) continue;
		    this.loadMesh( dict[k], k );
		}
	}

	// Return asset batch class
	return AssetBatch;

});