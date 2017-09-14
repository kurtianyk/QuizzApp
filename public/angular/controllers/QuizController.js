app.controller('QuizController', function($http, $scope, API_URL){
	
});

app.directive('quiz', function($http, API_URL, quizFactory,$interval) {
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
				scope.interval;
				scope.getQuestion();
				scope.QuizTime();
			};
			scope.regex = '/^[a-zA-Z ]+$/';

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
				location.reload();
			}

			// TODO timer

			scope.Quizname = quizFactory.getQuizname();
			scope.Timelimit = quizFactory.getTimelimit();
			
			scope.QuizTime = function () {
                scope.QuizMessage = "";
                 $interval(function () {
                    var time = scope.Timelimit--;
                    scope.QuizMessage = "You have " + time + " seconds for this quiz";
                    if(time == 0){
                    	scope.endQuiz();
                    }
                }, 1000);
            };
 			 
            scope.endQuiz = function () {
            		$http({
      					method: 'POST',
      					url: API_URL + '/add',
      					data: scope.data,
      					headers: {'Content-Type': 'application/json'}
    				}).then(function(response){
      					scope.score = response.data.result;
       				 },function(error){
      					console.log(error);
        			});
					scope.quizOver = true;
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
					if(scope.timerQ !==null){
						if(scope.interval !== undefined){
							$interval.cancel(scope.interval);
						}
						
						scope.StartTimer();
					}
				} else {
					scope.endQuiz();
				}
			};

			scope.StartTimer = function () {
                scope.Message = "";
 
                  scope.interval =  $interval(function () {
                    var time = scope.timerQ--;
                    scope.Message = "You have " + time + " seconds for this question";
                    if(time == 0){
                    	scope.nextQuestion();
                    }
                }, 1000);
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

			

			
		}
	}
});

app.factory('quizFactory', function($http, API_URL) {
	var questions;
	var quiz;
	var timelimit;

	$http.get(API_URL + "/test").then(function(response){
              questions = response.data.questions;
              quiz = response.data.testName;
              timelimit = response.data.timelimit;
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
		},
		getQuizname: function() {
				return quiz;
		},
		getTimelimit: function() {
				return timelimit;
		}
	};
});
