var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

var users = [];
io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('setUserName', function(data){
        console.log(data);
        if (users.indexOf(data) > -1 ){
            console.log(data);
            socket.emit('userExists', '<p class="bg-primary"> Пользователь' + 
                                        '<b>' + data + '</b>' + 
                                        ' уже существует, выбери другое имя!</p>'); 
        } else {
            console.log("app.js socket.on('setUserName'...  push to users and socket.emit 'userSet' ");
            users.push(data);
            socket.emit('userSet', {userName: data});
            console.log( users);
        }    
    });

    socket.on('message', function (data){
        io.sockets.emit('newMessage', data);
        console.log( data );
    });
});

    // http.listen(3000, function(){
    // console.log('Go to chat at http://localhost:3000');
    // });    
    
http.listen(3000,'localhost', function(){
    console.log('Go to chat at http://localhost:3000');
    
    
});