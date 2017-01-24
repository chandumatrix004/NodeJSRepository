var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactList', function(req, res){
	console.log("I received a GET request!");
	/*person1 = {
		name: 'Tim',
		email: 'Tim@yahoo.com',
		number: '(111) 111-1111'
	};
	
	person2 = {
		name: 'Maria',
		email: 'Maria@gmail.com',
		number: '(222) 222-2222'
	};
	
	person3 = {
		name: 'John',
		email: 'John@rediff.com',
		number: '(333) 333-3333'
	};
	
	var contactList = [person1, person2, person3];
	res.json(contactList);*/
	
	db.contactList.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/contactList',function(req, res){
	console.log(req.body);
	db.contactList.insert(req.body, function(err, docs){
		res.json(docs);
	});
});

app.delete('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

app.get('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

app.put('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactList.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, nummber: req.body.number}},
		new: true}, function(err, docs){
			res.json(docs);
	});
});

app.get('/',function(req, res){
	res.send('Hello World from server.js');
});

app.listen(3000);
console.log('Server running at port 3000.');