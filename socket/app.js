const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;
const server = require('http').createServer(app);
var io = require('socket.io')(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

io.on('connection', function(socket){
   socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
  });
});

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

    

server.listen(3000, function () {
    console.log('listening on *:3000');
});