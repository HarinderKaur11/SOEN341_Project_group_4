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
        $stateProvider.state('courses', {
            url: '/courses',
            templateUrl: '/authenticated/templates/courses.template.html'
        });
		
	    $stateProvider.state('register', {
            url: '/register',
            templateUrl: '/templates/register.template.html'
        });
		
		 $stateProvider.state('calendar', {
            url: '/calendar',
            templateUrl: '/authenticated/templates/calendar.template.html'
        });

		$urlRouterProvider.otherwise('/courses');
	}]);
})(angular);
