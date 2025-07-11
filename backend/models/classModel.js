import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    teacherID: {
        type: String,
        required: true,
        trim: true,
    },
    teacherEmail: {
        type: String,
        required: true,
        trim: true,
    },
    className: {
        type: String,
        required: true,
        trim: true,
    },
    classCode: {
        type: String,
        required: true,
        unique: true,
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
    },
    students: {
        type: [String],
        default: [],
        trim: true
    },
}, {
    _id: true,
    timestamps: true
});

const Class = mongoose.model("Class", classSchema);
export default Class;
