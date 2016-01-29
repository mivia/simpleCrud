angular.module('test')
.factory('RecordStorage', function($q){
	this.storageID = 'records';
	var store = this.store = {
		records: [],

		_saveToLS: function (records) {
			localStorage.setItem(this.storageID, JSON.stringify(records));
		},

		_getFromLS: function () {
			return JSON.parse(localStorage.getItem(this.storageID) || '[]');
		},

		get: function(){
			var deferred = $q.defer();
			angular.copy(store._getFromLS(), store.records);
			deferred.resolve(this.records);

			return deferred.promise;
		},

		insert: function(record){
			var deferred = $q.defer();
			this.records.push(record);
			store._saveToLS(this.records);
			deferred.resolve(this.records);

			return deferred.promise;
		},

		delete: function(record){
			var deferred = $q.defer();
			this.records.splice(this.records.indexOf(record), 1);
			store._saveToLS(this.records);
			deferred.resolve(this.records);

			return deferred.promise;
		},

		update: function(record, index){
			var deferred = $q.defer();
			this.records[index] = record;
			store._saveToLS(this.records);
			deferred.resolve(this.records);

			return deferred.promise;
		}
	}

	return store;
});

