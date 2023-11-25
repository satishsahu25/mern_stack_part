const express=require('express');
const cors=require('cors');
const {db}=require('./db/mongodb');
const app=express();
const {readdirSync}=require('fs');

const path=require('path');

require('dotenv').config();
const PORT=process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync('./routes').map((route)=>app.use('/api/v1',require('./routes/'+route)));
app.get('/',(req,res)=>{
    res.send('Hello wod');
})

//static files
app.use(express.static(path.join(__dirname, 'frontend/build')));
//route to access
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));

});



const server=()=>{
    db();
    app.listen(PORT,()=>{
        console.log('You are running:',PORT);
    });
       
}

server();