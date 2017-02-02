(function(angular) {
	angular.module('main').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/templates/homepage.template.html'
        });

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: '/templates/login.template.html'
        });

		$urlRouterProvider.otherwise('/home');
	}]);
})(angular);