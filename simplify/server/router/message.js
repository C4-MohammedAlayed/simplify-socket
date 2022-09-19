const  express  = require("express");

const messageRouter = express.Router();

const {auth}=require(`../middlewares/authentication`)
const {sendMessage,getMessageByUserId}=require(`../controller/message`)
messageRouter.post("/:id",auth,sendMessage);
messageRouter.get("/:id",getMessageByUserId);

module.exports =messageRouter;