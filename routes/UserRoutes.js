const express=require('express');
const router=express.Router();
const userController=require('../controllers/UserController')


router.post('/registerUser',userController.registerUser);
router.post('/loginUser',userController.loginUser);
router.get('/getAllUsers',userController.getAllUsers);
router.post('/getUserById',userController.getUserById);
router.delete('/deleteUserById/:id',userController.deleteUserById);
router.post('/verifyEmail',userController.verifyEmail);
router.post('/changePassword',userController.changePassword);

module.exports=router;