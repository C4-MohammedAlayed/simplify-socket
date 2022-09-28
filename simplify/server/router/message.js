const  express  = require("express");

const messageRouter = express.Router();

const {auth}=require(`../middlewares/authentication`)
const {sendMessage,getMessageByUserId,getAllMessages}=require(`../controller/message`)
messageRouter.post("/:id",auth,sendMessage);
messageRouter.get("/:id",auth,getMessageByUserId);
messageRouter.get("/",getAllMessages);


module.exports =messageRouter;