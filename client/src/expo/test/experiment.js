

define(["webaudiox", "expo/experiment/base", "bundle!entrance.expo"], function(WebAudiox, BaseExperiment, Entrance) {

	/**
	 * Create an experiment base class
	 */
	var Experiment = function() {
		BaseExperiment.call(this);

		// var geometry = new THREE.BoxGeometry( 4, 4, 4 );
		// var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );

		// // Create a bunch of cubes
		// this.cubes = [];
		// for (var i=0; i<500; i++) {
		// 	var cube = new THREE.Mesh( geometry, material );
		// 	cube.position.set(
		// 			Math.random() * 500 - 250,
		// 			Math.random() * 500 - 250,
		// 			Math.random() * 500 - 250
		// 		);
		// 	cube.rotation.set(
		// 			Math.random() * 3,
		// 			Math.random() * 3,
		// 			Math.random() * 3
		// 		);
		// 	this.cubes.push(cube);

		// 	// Put on scene
		// 	this.scene.add( cube );

		// }

		this.t = 0;
		this.entrance = Entrance.RESOURCES.mesh['entrance.obj'];
		this.scene.add( this.entrance );

		// Create some point light 
		// var light = new THREE.PointLight( 0xffffff, 1, 1000 );
		// light.position.set( 50,50,50 );
		// this.lights.push( light );

		// Create some ambient light 
		var light = new THREE.AmbientLight( 0x222222 );
		this.lights.push( light );

		var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		light.position.set( 0, 1, 0 );
		this.lights.push( light );

		// var light = new THREE.PointLight( 0xffffff, 1, 1000 );
		// light.position.set( 0, 8, 5 );
		// this.lights.push( light );

		var light = new THREE.PointLight( 0xffffff, 1, 1000 );
		light.position.set( 0, 5, 8 );
		this.lights.push( light );

		// var light = new THREE.PointLight( 0xffffff, 1, 1000 );
		// light.position.set( 0, 5, 15 );
		// this.lights.push( light );

		var light = new THREE.PointLight( 0xffffff, 1, 1000 );
		light.position.set( 0, 5, 30 );
		this.lights.push( light );

	}

	/**
	 * Subclass from BaseExperiment
	 */
	Experiment.prototype = Object.create( BaseExperiment.prototype );

	/**
	 * Handle animation events
	 */
	Experiment.prototype.onUpdate = function( delta ) {

		// for (var i=0; i<this.cubes.length; i++) {
		// 	this.cubes[i].rotation.z += delta / 1000;
		// 	this.cubes[i].rotation.x += delta / 1000;
		// }


		this.t += delta/10000;
		this.entrance.position.z = Math.sin(this.t) * 10;

	}

	// Return experiment base class
	return Experiment;

});