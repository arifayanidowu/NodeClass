var mongoose = require("mongoose"),
	studentSchema;

mongoose.connect("mongodb://localhost/student");

studentSchema = new mongoose.Schema({
	name: {type: String, required: true},
	role: {type: String, required: true},
	date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("pupil", studentSchema);