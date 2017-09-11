var mongoose = require('mongoose');
var Result = mongoose.model('Result');

exports.addResult = function(req, res){
	var newResult = new Result();

		// TODO : do add real name, comes from front-end
	newResult.username.firsname = req.body;
	newResult.username.lastname = req.body;

	//TODO: calculation of the score (must be a number)

	newResult.result = score;
	
	newResult.save(function(err,savedResult){
       if(err){
         res.status(400).send('Error occurred while creating task');
       }else{
         res.status(200).send(savedResult);
       }
   });
}