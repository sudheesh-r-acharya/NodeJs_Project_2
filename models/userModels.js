const mongoose = require("mongoose");

const userModels = new mongoose.Schema({
        task : {
            type :String,
            required : true
        },
        description : String,
        Duedate : String,
});

const User = mongoose.model("User" , userModels)

module.exports = User;