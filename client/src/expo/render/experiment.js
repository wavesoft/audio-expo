

define(["three"], function(THREE) {

	/**
	 * Create an experiment base class
	 */
	var Experiment = function() {

		// Create a container of the scene
		this.scene = new THREE.Object3D();
		this.lights = [];

		var geometry = new THREE.BoxGeometry( 5, 5, 5 );
		var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );

		this.cubes = [];
		for (var i=0; i<100; i++) {
			var cube = new THREE.Mesh( geometry, material );
			cube.position.set(
					Math.random() * 50 - 25,
					Math.random() * 50 - 25,
					Math.random() * 50 - 25
				);
			cube.rotation.set(
					Math.random() * 3,
					Math.random() * 3,
					Math.random() * 3
				);
			this.scene.add( cube );
			this.cubes.push(cube);
		}

		var light = new THREE.PointLight( 0xffffff, 1, 1000 );
		light.position.set( 50,50,50 );
		this.lights.push( light );

		this.light = light;


	}

	/**
	 * Handle animation events
	 */
	Experiment.prototype.update = function( delta ) {

		for (var i=0; i<this.cubes.length; i++) {
			this.cubes[i].rotation.z += delta / 1000;
			this.cubes[i].rotation.x += delta / 1000;
		}

	}

	// Return experiment base class
	return Experiment;

});