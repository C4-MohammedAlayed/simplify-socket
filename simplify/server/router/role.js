const express = require('express');

//createRouter
const roleRouter= express.Router();

const {createRole}= require("../controller/role");

roleRouter.post("/",createRole)

module.exports= roleRouter;