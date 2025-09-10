const express=require('express');
const userRouter=express.Router();
const createUser=require('../controllers/user.controller')



userRouter.post('/create-user',createUser)




module.exports=userRouter;