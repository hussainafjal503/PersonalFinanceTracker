const express=require('express');
const userRouter=express.Router();
const {createUser, getUserDetails}=require('../controllers/user.controller')



userRouter.post('/create-user',createUser)
userRouter.get('/get-user-details/:id',getUserDetails)




module.exports=userRouter;