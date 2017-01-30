(function(angular) {
	angular.module('main').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('test', {
			url: '/test',
			templateUrl: '/templates/test.html'
		});

		$urlRouterProvider.otherwise('/test');
	}]);
})(angular);