const express = require("express");
const userRouter = express.Router();

const signupController = require("../controllers/signup.controller");
const loginController = require("../controllers/login.controller");

userRouter.post("/signup", signupController);
userRouter.post("/login", loginController);

module.exports = userRouter;