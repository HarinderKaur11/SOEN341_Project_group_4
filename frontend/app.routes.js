(function(angular) {
	angular.module('main').config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('index', {
			url: '/',
			templateUrl: 'templates/index.html'
		});
	}]);
})(angular);