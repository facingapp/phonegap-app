module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - <%= pkg.description %>\n' +
					' * @link <%= pkg.homepage %>\n' +
					' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
					' * @version <%= pkg.version %>\n' +
					' * @license This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3 of the License.\n' +
					' * @copyright Copyright (C) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
					' * @builddate <%= grunt.template.today("yyyy-mm-dd") %>\n' +
					' */\n'
			},
			app: {
				src: [
					'src/js/app.js',
					'src/js/app/*.js',
					'src/js/app/**/*.js'
				],
				dest: 'assets/js/app.js',
			},
			gui: {
				src: [
					'src/js/gui.js',
					'src/js/gui/*.js',
					'src/js/gui/**/*.js'
				],
				dest: 'assets/js/gui.js',
			}
		},
		watch: {
			files: ['Gruntfile.js', 'src/js/*'],
			tasks: ['app', 'gui'],
			options: {
				spawn: false
			}
		},
		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				},
			},
			app: ['src/app/*.js', 'src/app/**/*.js'],
			gui: ['src/gui/*.js', 'src/gui/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('app', ['jshint:app', 'concat:app']);
	grunt.registerTask('gui', ['jshint:gui', 'concat:gui']);
};
