var mongoose = require('mongoose');
var Result = mongoose.model('Result');

exports.addResult = function(req, res){
	var newResult = new Result();
	var score = 0;
	
	req.body.forEach(function(item, i, arr) {

 	if(i == 0){
 	 	var name = item.choise.toString().split(' ');
 	 	newResult.username.firsname = name[0];
 	 	newResult.username.lastname = name[1];
 	} else if(i == 1){
 	 	newResult.experience = item.choise;
 	}
 	else{
 	 	if(JSON.stringify(item.choise) == JSON.stringify(item.TrueAnswer) ){
 	 		score++;
 	 	}
 	}

 	if(i == req.body.length -1){
 	 	newResult.result = score;
 	}

	});
	
	newResult.save(function(err,savedResult){
       if(err){
         res.status(400).send('Error occurred while creating task');
       }else{
         res.status(200).send(savedResult);
       }
   });
}