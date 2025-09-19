// All the backend stuff here
import express from 'express';
import https from 'https';
import fs from 'fs';
import {Server} from 'socket.io';
const app = express();
// app.use(middleware) middleware ek funxn haii, by default empty
// openssl req -new -x509 -key key.pem -out cert.pem -days 365
const httpsServer = https.createServer({
    cert : fs.readFileSync('./cert/server.crt'),
    key: fs.readFileSync('./cert/server.key')
},app);

// hhtps server ko offer kara rather than app, certificates chahiye hote haii
app.use(express.static('public'));
const io = new Server (httpsServer, {cors: {origin:'*'}});
// if any new user arrives, connection build
io.on('connection', socket=>{
    // after arrive, it will take some actiono
    // e.g join the meeting
    socket.on('join-meeting',()=>{
        const peers = [...io.sockets.sockets.key()].filter(id=>socket.id!=id) //peers
        socket.emit('peers', peers); //event fire, kuch bhejna haii

    })
    socket.on('leave-meeting',()=>{

    })
    socket.on('signal', ({to, description, candidate})=>{
        if(to){
            io.to(to).emit('signal',
                {from:socket.id, description, candidate});
        }
    })
}) // sunn rha hu
httpsServer.listen(1234, err=>{
    if(err){
        console.log('Server Crash', err);
    }else{
        console.log('Server Up and Running', 'https://localhost:1234');
    }
})