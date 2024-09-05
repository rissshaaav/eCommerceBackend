const express = require("express");
const userRouter = express.Router();

const signupController = require("../controllers/signup.controller")

userRouter.post("/signup", signupController);

module.exports = userRouter;