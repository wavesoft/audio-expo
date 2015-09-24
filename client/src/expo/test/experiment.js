

define(["expo/experiment/base"], function(BaseExperiment) {

	/**
	 * Create an experiment base class
	 */
	var Experiment = function() {
		BaseExperiment.call(this);

		var geometry = new THREE.SphereGeometry( 5, 4, 4 );
		var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );

		// Create a bunch of cubes
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
			this.cubes.push(cube);

			// Put on scene
			this.scene.add( cube );

		}

		// Create some point light 
		var light = new THREE.PointLight( 0xffffff, 1, 1000 );
		light.position.set( 50,50,50 );

		// Store on lights
		this.lights.push( light );

	}

	/**
	 * Subclass from BaseExperiment
	 */
	Experiment.prototype = Object.create( BaseExperiment );

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