(function(angular) {
	angular.module('main').config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('test', {
			url: '/test',
			templateUrl: 'templates/test.html'
		});
	}]);
})(angular);