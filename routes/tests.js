var mongoose = require('mongoose');
var Test = mongoose.model('Test');
	
	Test.find({}).remove()
		.then(function(){
			Test.create({
				_id: 1,
				testName: 'Simple Quiz',
				timelimit: 180,
				questions: [{ text : "Your name", hint : "Firstname Lastname", type: "input", timelimit: null, answers: [], TrueAnswer: []},
				 {text : "Total experience with HTML", hint : "Enter number in months, f. e. 5", type: "input", timelimit: null, answers: [], TrueAnswer: []},
				 {text : "Question-1", hint : "Just one correct answer", type: "radio", timelimit: 30, answers: ["Answer-1", "Answer-2", "Answer-3"], TrueAnswer: ["Answer-2"]}, 
				 {text : "Question-2", hint : "Can be one to four correct answers", type: "checkbox", timelimit: 40, answers: ["Option-1", "Option-2", "Option-3", "Option-4"], TrueAnswer: ["Option-3", "Option-4"]},
				 {text : "What will be the result of this operation: 1+1", hint : "Enter the result only", type: "input", timelimit: null, answers: [], TrueAnswer: ["2"]}]
			});
		});

exports.getTest = function(req, res){
	Test.findOne({"_id" : 1}, function(err, test){
		res.status(200).send(test);
	});
}
