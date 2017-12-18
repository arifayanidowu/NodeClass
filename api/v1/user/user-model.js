var mongoose = require("mongoose"),
    bcrypt = require("bcrypt"), // For password encryption
    UserSchema;

mongoose.connect("mongodb://localhost/student");

UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// The code for encryption of password
UserSchema.pre("save", function(next) {
    this.password = this.encryptPassword(this.password);
    next();
});
// validation for the encrypted password
UserSchema.methods = {
    encryptPassword: function(plainText) {
        if (!plainText) {
            return "";
        }
        var salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(plainText, salt);
    },

    authenticate: function(plainText) {
        return bcrypt.compareSync(plainText, this.password);
    }
};

module.exports = mongoose.model("user", UserSchema);