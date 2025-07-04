const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
        trim: true,
    },
    section: {
        type: String,
        trim: true,
    },
    subject: {
        type: String,
        trim: true,
    },
    room: {
        type: String,
        trim: true,
    }
}, {
    _id: true,
    timestamps: true
});

module.exports = mongoose.model("Class", classSchema);
