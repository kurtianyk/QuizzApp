const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/quizApp';

mongoose.Promise = global.Promise;
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to' + dbURI);
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});
var testsSchema = new mongoose.Schema({
	_id: {
		type: Number
	},
	testName: {
		type: String
	},
	timelimit: {
		type: Number
	},
	questions: {
        type: Array
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { _id: false });

var resultsSchema = new mongoose.Schema({
	username: {
		firsname : String,
		lastname: String
	},
	result: {
		type: Number
	},
    created_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Test', testsSchema, 'tests');
mongoose.model('Result', resultsSchema, 'results');