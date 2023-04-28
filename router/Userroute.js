const express = require('express');
const router = express.Router();
const usercontroller= require('../Controller/UserController')
const path=require('path');
const auth=require('../middelware/auth');
const { checkAdmin,
    checkUser,
    checkRole,
    checkS,checkPRole}=require('../middelware/userauth');

router.post('/register',usercontroller.register);
router.post('/login',usercontroller.postlogin);
// router.get('/getuser',auth,checkAdmin,usercontroller.getuser);
// router.get('/profile',auth,checkRole,usercontroller.profile);
// router.get('/profile',auth,checkS(['admin']),usercontroller.profile);
router.get('/profile',auth,checkPRole('read'), usercontroller.profile);
module.exports=router;
