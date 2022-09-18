const express = require('express');

//createRouter
const loginRouter= express.Router();

const {login}= require("../controller/login");

loginRouter.post("/",login)

module.exports= loginRouter;