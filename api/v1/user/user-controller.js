var UserModel = require("./user-model.js"),
    auth = require("../auth/auth.js");

exports.interceptIds = function(req, res, next, id) {
    UserModel.find(id, (err, data) => {
        if (err) {
            return next(new Error("....."))
        }

        req.user = data;
        next();
    });
};

exports.addUsers = function(req, res, next) {
    var user = req.body;

    var person = new UserModel(user);

    person.save(function(err, data) {
        if (err) {
            return next(new Error("cannot add user"));
        }
        data = data.toObject();
        var token = auth.signToken(req.body._id);
        data["_token"] = token; // data._token = token;

        res.status(200).json(data);
    });
};

exports.getUser = function(req, res, next) {
    if (!req.user) {
        return next(new Error("cannot get user"));
    }
    res.status(200).json(req.user);
}

exports.fetchUsers = function(req, res, next) {
    UserModel.find(function(err, data) {
        if (err) {
            return next(new Error("could not fetch all users"))
        }

        res.status(200).json(data);
    })
}

exports.deleteUser = function(req, res, next) {
    UserModel.remove({ _id: req.user._id }, req.body, (err, res) => {
        if (err) {
            return next(new Error("cannot delete user"))
        }
    })

    res.status(200).json(req.user)
}

exports.updateUser = function(req, res, next) {
    UserModel.update({ _id: req.user._id }, req.body, (err, res) => {
        if (err) {
            return next(new Error("cannot update user"))
        }
    })
    res.status(200).json(req.user)
}