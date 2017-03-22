(function(angular) {
	angular.module('main').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/./authenticated/templates/homepage.template.html'
        });

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: './non-authenticated/templates/login.template.html'
        });

        $stateProvider.state('fileup', {
            url: '/fileup',
            templateUrl: '/authenticated/templates/fileup.template.html'
        });

        $stateProvider.state('chat', {
            url: '/chat',
            templateUrl: '/authenticated/templates/chat.template.html'
        });
		
	   $stateProvider.state('register', {
            url: '/register',
            templateUrl: '/templates/register.template.html'
        });
		
		 $stateProvider.state('calendar', {
            url: '/calendar',
            templateUrl: '/templates/calendar.html'
        });

		$urlRouterProvider.otherwise('/home');
	}]);
})(angular);
