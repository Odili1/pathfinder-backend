import * as mongoose from "mongoose";

export const resourceSchema = new mongoose.Schema({
    avatar: {
        type: String
    },
    title: {
        type: String
    },
    company: {
        type: String
    },
    level: {
        type: String
    },
    noOfStudents: {
        type: String
    },
    courseDuration: {
        type: String
    },
    files: {
        type: Array
    },
    price: {
        type: String
    },
    levelOfExpertise: {
        type: String
    },
    noOfStudentsGraduated: {
        type: String
    },
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    }
}, {timestamps: true})