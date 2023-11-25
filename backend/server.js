const express=require('express');
const cors=require('cors');
const { router } = require('./routes/route');
require('dotenv').config();

//dotenv configuration


const app=express();


//middle
app.use(cors());
app.use(express.json());

//routes
app.use('/api/user',router);

//port
const port=process.env.PORT ||5000

// /listen
app.listen(port,()=>{
    console.log(`listening on port: ${port}`);
})
