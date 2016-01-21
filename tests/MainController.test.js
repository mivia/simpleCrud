describe('MainController', function () {
		var ctrl, scope, store, modal;

		// Load the module containing the app, only 'ng' is loaded by default.
		beforeEach(module('test'));

		beforeEach(inject(function ($controller, $rootScope, RecordStorage, $modal) {
			scope = $rootScope.$new();
			store = RecordStorage;
			modal = $modal;

			ctrl = $controller('MainController', {
				$scope: scope,
				store: store
			});
		}));

		it('should have no records at the beggining', function(){
			expect(scope.records.length).toBe(0);
		});

		describe('when having 0 records', function () {
			var ctrl;

			beforeEach(inject(function ($controller) {
				ctrl = $controller('MainController', {
					$scope: scope,
					store: store
				});
				scope.$digest();
			}));

			it('should not add whitespace records', function () {
				scope.record = {
					name: '   ',
					email: 'test@example.com'
				}
				scope.addRecord();
				scope.$digest();
				expect(scope.records.length).toBe(0);
			});

			it('should not add empty records', function () {
				scope.record = {
					name: '',
					email: ''
				};
				scope.addRecord();
				scope.$digest();
				expect(scope.records.length).toBe(0);
			});
		});

		describe('When having some records already', function(){
			var ctrl;

			beforeEach(inject(function ($controller) {
				ctrl = $controller('MainController', {
					$scope: scope,
					store: store
				});

				store.insert({name: 'testName', email: 'test@gmail.com'});
				store.insert({name: 'testName', email: 'test@gmail.com'});
				store.insert({name: 'testName', email: 'test@gmail.com'});
				scope.$digest();
			}));


			it('should get records from LS on init', function(){
				store.get();
				scope.$digest();
				expect(scope.records.length).toBe(3);
			})

			it('should count records correctly', function(){
				expect(scope.recordsCount).toBe(3);
			})

			it('should delete records correctly', function(){
				scope.recordToChange = scope.records[0];
				scope.deleteRecord();
				scope.$digest();
				expect(scope.records.length).toBe(2);
			})

			it('should update records correctly', function(){
				var recordToEdit = scope.recordToEdit = scope.records[0];
				recordToEdit.name = 'tester';
				scope.updateRecord();
				scope.$digest();
				expect(scope.records[0].name).toBe('tester');
			})
		})
});