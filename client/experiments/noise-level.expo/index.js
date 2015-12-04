define([],{

    /**
     * Bundle name
     */ 
    "name": "noise-level.expo",

    /**
     * Metadata
     */
    "meta": {

        /**
         * Experiment entry point
         */
        "experiment": "experiment.js",

    },

    /**
     * Specify what to load
     */
    "load": {
        
        "THREE.JSONLoader": {
            "geometry/pillar": "${BUNDLE}/geometry/pillar.json"
        }

    }

});
