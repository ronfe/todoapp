var express = require('express');
var app = express();

var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://chihungfei:buguan372101@proximus.modulusmongo.net:27017/Maro2wis');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//model part
var Todo = mongoose.model('Todo', {
    text: String,
});

//var hasDone = mongoose.model('hasDone', {hasN: Number});

//router part manipulating data
app.get('/api/todos', function(req, res){
    Todo.find(function(err, todos){
        if(err) 
            res.send(err);
        res.json(todos);
    });
});

app.post('/api/todos', function(req, res){
    Todo.create({
        text: req.body.text,
        done: false,
        
    }, function(err, todo){
        if(err)
            res.send(err);
        Todo.find(function(err, todos){
            if (err){res.send(err);}
            res.json(todos);
        });
    });
});

app.delete('/api/todos/:todo_id', function(req, res){
    Todo.remove({
        _id: req.params.todo_id
    }, function(err, todo){
        if(err) {res.send(err);}
        Todo.find(function(err, todos){
            if (err) {res.send(err);}
            res.json(todos);
        });
    });
    
});

//router control home
app.get('*', function(req, res){
    res.sendfile('./public/index.html');
});

//run
app.listen(8080);