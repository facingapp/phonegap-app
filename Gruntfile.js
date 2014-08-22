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
			},
			lib: {
				src: [
					'src/js/lib/*.js'
				],
				dest: 'assets/js/lib.js',
			}
		},
		watch: {
			app: {
				files: [
					'src/js/app.js',
					'src/js/app/*.js',
					'src/js/app/**/*.js'
				],
				tasks: ['app'],
				options: {
					spawn: false
				}
			},
			gui: {
				files: [
					'src/js/gui.js',
					'src/js/gui/*.js',
					'src/js/gui/**/*.js'
				],
				tasks: ['gui'],
				options: {
					spawn: false
				}
			},
			lib: {
				files: [
					'src/js/lib/*.js'
				],
				tasks: ['lib'],
				options: {
					spawn: false
				}
			},
			main: {
				files: [
					'src/scss/*.scss'
				],
				tasks: ['css-main'],
				options: {
					spawn: false
				}
			}
		},
		jshint: {
			options: {
				reporter: require('jshint-stylish')
			},
			app: ['src/app/*.js', 'src/app/**/*.js'],
			gui: ['src/gui/*.js', 'src/gui/**/*.js'],
			lib: ['src/lib/*.js']
		},
		sass: {
			main: {
				files: {
					'assets/css/main.css': 'src/scss/main.scss'
				}
			},
			fa: {
				files: [{
					expand: true,
					cwd: 'src/scss/font-awesome',
					src: ['font-awesome.scss'],
					dest: 'assets/css/',
					ext: '.css'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('js-app', ['jshint:app', 'concat:app']);
	grunt.registerTask('js-gui', ['jshint:gui', 'concat:gui']);
	grunt.registerTask('js-lib', ['jshint:lib', 'concat:lib']);
	grunt.registerTask('js', ['js-app', 'js-gui', 'js-lib']);

	grunt.registerTask('css-main', ['sass:main']);
	grunt.registerTask('css-fa', ['sass:fa']);
	grunt.registerTask('css', ['css-main', 'css-fa']);

	grunt.registerTask('default', ['js', 'css']);
};
