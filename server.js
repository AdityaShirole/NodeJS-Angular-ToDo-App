// Setup =============================================================================

var express = require('express');
var app = express();	//create the express app
var mongoose = require('mongoose');

var morgan = require('morgan');	//logs requests to the console
var bodyParser = require('body-parser');	//allows you to read data from the request
var methodOverride = require('method-override');

// Config ==============================================================================

mongoose.connect('mongodb://AdityaShirole:ad2160@ds035310.mongolab.com:35310/todoapp');

app.use(express.static(__dirname + '/public'));		//all static files will be delivered from /public
app.use(morgan('dev'));					//log every request to console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended' : 'true' }));
app.use(bodyParser.json({ type : 'application/vnd.api+json' }));
app.use(methodOverride());

// Define Models (this should be later separated out into its own file)=================

var Todo = mongoose.model('Todo', {
	text : String
});


// Routes ==============================================================================

	//api
	//get
	app.get('/api/todos', function(req,res){
		//use mongoose to find all Todos
		Todo.find(function(err,todos){
			if(err){
				res.send(err);			
			}	
			res.json(todos);	//send all todos in json format	
		});	
	});

	app.post('/api/todos', function(req,res){
		
		//create a todo using info from the body
		Todo.create({
			text : req.body.text 
			},function(err, todo) {
			if(err){
				res.send(err);
			}
			
			Todo.find(function(err,todos){
				if(err){
					res.send(err);				
				}
				res.json(todos);		//again send all todos
			});		
		});
	});

// Start server =========================================================================

app.listen(8000);

console.log("App listening on port 8000");
