app.controller('QuizController', function($http, $scope, API_URL){

	$http.get(API_URL + "/test").then(function(response){
              $scope.quiz = response.data;
            },
            function(error){ $scope.testListEmpty = "You haven't tests";
        });

	
});