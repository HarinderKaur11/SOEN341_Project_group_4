(function(angular) {
	angular.module('main').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/templates/homepage.html'
        });

		$urlRouterProvider.otherwise('/home');
	}]);
})(angular);