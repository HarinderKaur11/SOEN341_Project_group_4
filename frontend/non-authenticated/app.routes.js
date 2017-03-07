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
		
	   $stateProvider.state('register', {
            url: '/register',
            templateUrl: '/templates/register.template.html'
        });

		$urlRouterProvider.otherwise('/home');
	}]);
})(angular);
