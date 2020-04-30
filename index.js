var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  // socket.broadcast.emit('hi');

  // socket.join('room_one');

  // socket.on('say_to_someone', (id, msg) => {
  //   socket.broadcast.to(id).emit('my_message', msg);
  // });

  socket.on('chat_message', (msg) => {
    console.log("messag: ", msg);
    io.emit('chat_message', msg);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening in *:3000');
});

// namespace customize
// const nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket){
//   console.log('someone conneced');
// });
// nsp.emit('hi', 'everyone!');


// send message out of namespace
// const io = require('socket.io')(3000);
// const redis = require('socket.io-redis');
// io.adapter(redis({ host: 'localhost', port: 6379}));
  
// const io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });
// setInterval(function(){
//   io.emit('time', new Date);
// }, 5000);