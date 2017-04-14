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
		
        $stateProvider.state('grades', {
            url: '/grades',
            templateUrl: '/authenticated/templates/grades.template.html'
        });
		
	$stateProvider.state('register', {
            url: '/register',
            templateUrl: '/templates/register.template.html'
        });

    $stateProvider.state('chat', {
            url: '/chat',
            templateUrl: '/authenticated/templates/chat.html'
        });
		
	$stateProvider.state('calendar', {
            url: '/calendar',
            templateUrl: '/authenticated/templates/calendar.template.html'
        });
        
        $stateProvider.state('help', {
            url: '/help',
            templateUrl: '/authenticated/templates/help.template.html'
        });

	$urlRouterProvider.otherwise('/courses');
	}]);
})(angular);
