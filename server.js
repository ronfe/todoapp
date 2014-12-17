var express     = require('express');
var logger      = require('express-log');
var static      = require('express-static');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');


var app = express();

app.set('db', 'mongodb://chihungfei:buguan372101@proximus.modulusmongo.net:27017/Maro2wis')

app.use(logger());
app.use(static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

//model part
var Todo = mongoose.model('Todo', {
    text: String
});
//router part manipulating data
app.get('/api/todos', function(req, res){
    Todo.find(function(err, todos){
      if(err) return res.status(500).send(err);
      res.json(todos);
    });
});
//create todo
app.post('/api/todos', function(req, res){
    Todo.create({
        text: req.body.text,
        done: false,
    }, function(err, todo){
        if(err) return res.status(500).send(err);
        res.json(todo);
    });
});
//remove todo
app.delete('/api/todos/:todo_id', function(req, res){
    Todo.remove({
        _id: req.params.todo_id
    }, function(err, todo){
        if(err) return res.status(500).send(err);
        res.json(todo);
    });
});
//connect to mongodb
mongoose.connect(app.get('db'), function(err){
  if(err) throw err;
  //run
  var port = process.env.PORT || 3000;
  var server = app.listen(port, function(){
    console.log('server is running at %s', server.address().port);
  });
});

module.exports = app;
