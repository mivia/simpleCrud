angular.module('test', ['ngRoute', 'ngResource', 'ui.bootstrap'])
	.config(function ($routeProvider) {
		'use strict';

		var mainConfig = {
			controller: 'MainController',
			templateUrl: './partials/main.html',
			resolve: {
				store: function (RecordStorage) {
					RecordStorage.get();
					return RecordStorage;
				}
			}
		};

		$routeProvider
		.when('/', mainConfig)
		.otherwise({redirectTo:'/'});
});