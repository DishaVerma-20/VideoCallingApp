// All the backend stuff here
import express from 'express';
import https from 'https';
import fs from 'fs';
const app = express();
// app.use(middleware) middleware ek funxn haii, by default empty
// openssl req -new -x509 -key key.pem -out cert.pem -days 365
const httpsServer = https.createServer({
    cert : fs.readFileSync('./cert/server.crt'),
    key: fs.readFileSync('./cert/server.key')
},app);
// hhtps server ko offer kara rather than app, certificates chahiye hote haii
app.use(express.static('public'));
httpsServer.listen(1234, err=>{
    if(err){
        console.log('Server Crash', err);
    }else{
        console.log('Server Up and Running', 'https://localhost:1234');
    }
})