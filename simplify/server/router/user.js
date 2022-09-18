const  express  = require("express");

const userRouter = express.Router();

const {createUser,getAllUsers}=require(`../controller/user`)
userRouter.post("/",createUser);
userRouter.get("/",getAllUsers);

module.exports =userRouter;
