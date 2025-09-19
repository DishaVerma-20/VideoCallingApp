// All the backend stuff here
import express from 'express';
const app = express();
// app.use(middleware) middleware ek funxn haii, by default empty
app.use(express.static('public'));
app.listen(1234, err=>{
    if(err){
        console.log('Server Crash', err);
    }else{
        console.log('Server Up and Running', 'http://localhost:1234');
    }
})