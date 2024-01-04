const express = require('express');
const cors = require('cors');
const app = express();
const {Server} = require('socket.io');


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({}))


const httpServer = app.listen(7000,()=>console.log("http://localhost:7000/"));
const io = new Server(httpServer,{cors:'*'});

io.on('connection', (socket) => {
    console.log('a user connected to socket', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('typing', () => {
        socket.broadcast.emit('typing');  
    });

    socket.on('not_typing', () => {
        socket.broadcast.emit('not_typing');
    })
});
