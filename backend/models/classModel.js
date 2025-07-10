import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    teacherID: {
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
        default: function() {
            return generateClassCode();
        }
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
        type: [String], // ← array of strings
        default: [],
        trim: true
    },
    classCode: {
        type: String,
        trim: true,
    }
}, {
    _id: true,
    timestamps: true
});

function generateClassCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const length = Math.floor(Math.random() * 4) + 5; // 5-8 characters
    
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const Class = mongoose.model("Class", classSchema);
export default Class;
