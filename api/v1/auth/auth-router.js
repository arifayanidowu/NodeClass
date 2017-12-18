var express = require("express"),
	router = express.Router(),
	controller = require("./auth-controller.js"),
	auth = require("./auth.js");

router.route("/")
	.post(auth.verifyUser, controller.signIn);

module.exports = router;