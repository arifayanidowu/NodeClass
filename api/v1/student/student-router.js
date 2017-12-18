var express = require("express"),
    router = express.Router(),
    controller = require("./student-controller.js"),
    auth = require("../auth/auth.js");

router.param("id", controller.interceptIds);

router.route("/")
    .post(auth.decodeToken, controller.addStudent)
    .get(auth.decodeToken, controller.getStudents);

router.route("/:id")
    .get(auth.decodeToken, controller.getStudent)
    .delete(auth.decodeToken, controller.deleteStudent)
    .put(auth.decodeToken, controller.updateStudent);

module.exports = router;