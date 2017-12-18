var express = require("express"),
    app = express(),
    bps = require("body-parser"),
    morgan = require("morgan"),
    studentModel = require("./student-model.js");

app.use(bps.json());
app.use(bps.urlencoded({ extended: true }))

app.use(morgan("dev"));


app.param("id", function(req, res, next) {
    var id = req.params.id;

    studentModel.findById(id, (err, data) => {
        if (err) {
            return next(new Error("...."));
        }

        req.student = data;
        next();
    })
})




// app.get, app.put are called Endpoints
app.get("/getStudentsNew/:id", function(req, res, next) {
    if (!req.student) {
        return next(new Error("could not get students"));
    }

    res.status(200).json(req.student);
})


app.post("/addStudent", function(req, res, next) {
    var student = req.body;

    var pupil = new studentModel(student);
    pupil.save(function(err, data) {
        if (err) {
            return next(new Error("could not add student"))
        }

        res.status(200).json(data);
    })
})

app.get("/getStudents", function(req, res, next) {
    studentModel.find(function(err, data) {
        if (err) {
            return next(new Error("could not get student"))
        }
        res.status(200).json(data);
    })
})

app.get("/getStudent/:id", (req, res, next) => {
    var id = req.params.id;

    studentModel.findById(id, (err, data) => {
        if (err) {
            return next(new Error("cannot get student"))
        }
        res.status(200).json(data);
    })
})

/*app.delete("/deleteStudent/:id", (req, res, next) =>{
	var id = req.params.id;

	studentModel.findByIdAndRemove(id, (err, data) =>{
		if(err){
			return next(new Error("failed to delete"))
		}
		res.status(200).json(data);
	})
})*/
// The code below is to avoid callback hell, this method is called a promise method
app.delete("/removeStudent/:id", (req, res, next) => {
    var id = req.params.id;

    studentModel.findByIdAndRemove(id)
        .then(function(data) {
            if (!data) {
                return next(new Error("cannot delete student"))
            }
            res.status(200).json(data);
        }, function(err) {
            return (err);

        })
})

app.put("/updateStudent/:id", (req, res, next) => {
    var id = req.params.id;

    studentModel.findByIdAndUpdate(id, req.body, (err, data) => {
        if (err) {
            return next(new Error("failed to update"))
        }
        res.status(200).json(data);
    })
})

app.use(function(err, req, res, next) {
    res.status(500).json(err.message)
    next();
})

app.listen(2000, function(err) {
    if (err) {
        return err;
    }
    console.log("server started...");
})