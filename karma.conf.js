module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		plugins: ['karma-coverage', 'karma-jasmine', 'karma-phantomjs-launcher'],
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-resource/angular-resource.js',
			'bower_components/angular-bootstrap/ui-bootstrap.js',
			'./src/js/**/*.js',
			'./tests/**/*.js'
		],
		autoWatch: true,
		singleRun: false,
		browsers: ['PhantomJS'],
		reporters: ['progress', 'coverage'],
		preprocessors: {
	      './src/js/**/*.js': ['coverage']
	    },
	    coverageReporter: {
	      dir : './coverage/',
	      reporters: [
	      	{ type: 'html', subdir: 'report-html' }
	      ]
	    }
	});
};