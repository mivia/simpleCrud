angular.module('test')
	.controller('MainController', function ($scope, $routeParams, store, $modal) {
		'use strict';

		$scope.$modal = $modal;
		$scope.store = store;
		$scope.record = {
			name: '',
			email: ''
		}
		$scope.recordToChange = {};
		$scope.$watch(function(){
			$scope.recordsCount = $scope.records.length;
		});
		var records = $scope.records = store.records;

		$scope.loadUpdateModal = function(record){
			$scope.recordToChange = record;
			$scope.$modal.open({
				templateUrl: '/partials/modals/update-record-modal.html',
				scope: $scope
			});
		}

		$scope.loadAddingModal = function(){
			$scope.$modal.open({
				templateUrl: '/partials/modals/add-record-modal.html',
				scope: $scope
			});
		}

		$scope.loadDeletingModal = function(record){
			$scope.recordToChange = record;
			$scope.$modal.open({
				templateUrl: '/partials/modals/delete-record-modal.html',
				scope: $scope
			});
		}

		$scope.addRecord = function(){
			var record = {
				name: $scope.record.name.trim(),
				email: $scope.record.email
			};

			if (!record.name || !record.email) {
				return;
			}

			$scope.store.insert(record)
				.then(function(){
					$scope.record = {
						name: '',
						email: ''
					}
				})
				.finally(function(){
					// some final action
				})
		}
		
		$scope.deleteRecord = function(){
			$scope.store.delete($scope.recordToChange);
		}

		$scope.updateRecord = function(){
			$scope.store.update($scope.recordToChange, $scope.records.indexOf($scope.recordToChange));
		}
});
