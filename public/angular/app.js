var app = angular.module('quizApp', ['ui.router']).constant('API_URL', 'http://localhost:8080');

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'templates/index.html'
        })
        .state('quiz', {
            url: '/quiz',
            templateUrl: 'templates/quiz.html',
            controller:'QuizController'
        })     
});