var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglifyjs');
var webpack = require('webpack-stream');

/**
 * Compile and pack Javascript files
 */
gulp.task('js', function() {
	return gulp.src('src/js/audioexpo.js')
		.pipe(webpack({
			module: {
				loaders: [
					{ test: /\.json$/, loader: 'json' },
				],
		    },
		    node: {
		    	fs: 'empty'
		    },
		    output: {
		    	filename: 'audioexpo.js'
		    },
		    plugins: [
		    	new webpack.webpack.optimize.DedupePlugin()
		    ],
		    resolve: {
		    	modulesDirectories: [
		    		"web_modules", "node_modules", "lib"
		    	],
		    	alias: {
		    		html: __dirname + "/src/html"
		    	}
		    }
		}))
		.pipe(gulp.dest('build/js'))
		.pipe(uglify("audioexpo.min.js", { outSourceMap: true }))
		.pipe(gulp.dest('build/js'));
});

/**
 * Compile css
 */
gulp.task('css', function() {
	return gulp.src('src/css/*.less')
		.pipe(less())
		.pipe(gulp.dest('build/css'));
});

/**
 * Copy static files
 */
gulp.task('static', function() {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('build/'));
});

/**
 * Copy resources
 */
gulp.task('resources', function() {
	return gulp.src('resources/**/*')
		.pipe(gulp.dest('build/'));
});

/**
 * Entry point
 */
gulp.task('default', ['js', 'static', 'resources', 'css'], function() {
});

/**
 * Stay live
 */
gulp.task('live', ['default'], function() {
	gulp.watch('src/js/**', ['js'], function(event) { })
	gulp.watch('src/css/**', ['css'], function(event) { })
});