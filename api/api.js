var express = require("express"),
    api = express.Router(),
    studentRouter = require("./v1/student/student-router.js"),
    userRouter = require("./v1/user/user-router.js"),
    authRouter = require("./v1/auth/auth-router.js");

api.use("/students", studentRouter);
api.use("/users", userRouter);
api.use("/auth", authRouter);

module.exports = api;