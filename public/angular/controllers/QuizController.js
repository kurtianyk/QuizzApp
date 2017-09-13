app.controller('QuizController', function($http, $scope, API_URL){
	$http.get(API_URL + "/test").then(function(response){
              $scope.quiz = response.data.testName;
              $scope.timelimit = response.data.timelimit;
            },
            function(error){ $scope.testListEmpty = "You haven't tests";
        });

});

app.directive('quiz', function($http, API_URL, quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'angular/directive/template/quizTemplate.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.data = [];
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}
			// TODO timer
			scope.getTimer = function() {

			};

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.data[scope.id] = quizFactory.getQuestion(scope.id);
					scope.question = q.questionText;
					scope.options = q.answers;
					scope.answer = q.TrueAnswer;
					scope.type =  q.type;
					scope.hint =  q.hint;
					scope.timerQ = q.timelimit;
				} else {

					$http({
      					method: 'POST',
      					url: API_URL + '/add',
      					data: scope.data,
      					headers: {'Content-Type': 'application/json'}
    				}).then(function(response){
      					scope.score = response.data.result;
      					console.log(scope.score);
       				 },function(error){
      					console.log(error);
        			});
					// scope.score = resultFactory.getResult(scope.data);
					scope.quizOver = true;
				}
			};

			scope.nextQuestion = function() {
				scope.data[scope.id].choise = [];

				if($('input[type=text]').val() || $('input[type=number]').val()) {
					scope.data[scope.id].choise.push($('input[name=answer]').val());
				}
				else if($('input[type=radio]:checked').val()){
					scope.data[scope.id].choise.push($('input[type=radio]:checked').val());
				}
				else if($('input[type=checkbox]:checked').val()){
					$.each($("input[type='checkbox']:checked"), function(){            
               		 scope.data[scope.id].choise.push($(this).val());
            		});
				}

				$('input[name=answer]').focus();
				$('input[name=answer]').val('');
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();

			
		}
	}
});

app.factory('quizFactory', function($http, API_URL) {
	var questions;

	$http.get(API_URL + "/test").then(function(response){
              questions = response.data.questions;
            },
            function(error){ $scope.testListEmpty = "You haven't tests";
        });

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}

	};
});

// app.factory('resultFactory', function($http, API_URL) {
	
// 	return {
// 		getResult: function(res) {
// 			$http({
//       			method: 'POST',
//       			url: API_URL + '/add',
//       			data: res,
//       			headers: {'Content-Type': 'application/json'}
//     		}).then(function(response){
//       			return response.data;
//        		 },function(error){
//       			console.log(error);
//         	});

// 		}

// 	};
// });