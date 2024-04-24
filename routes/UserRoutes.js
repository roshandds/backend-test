const express=require('express');
const router=express.Router();
const userController=require('../controllers/UserController')


router.post('/registerUser',userController.registerUser);

module.exports=router;