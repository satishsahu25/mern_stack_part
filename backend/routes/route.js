const express= require('express');
const { sendemail } = require('../controller/routecontrol');

const router=express.Router();


//router

router.post('/sendemail', sendemail);

module.exports={router}