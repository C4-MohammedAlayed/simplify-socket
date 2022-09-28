const express = require('express');

//createRouter
const notificationRouter= express.Router();
const {auth}=require(`../middlewares/authentication`)
const {createNotification,getNotification,DeleteNotification}= require("../controller/notification");

notificationRouter.post("/:id",auth,createNotification)

//:id sender id / and we can get the reciver_id from token
notificationRouter.get("/",auth,getNotification)
notificationRouter.delete("/:id",auth,DeleteNotification)

module.exports= notificationRouter;
