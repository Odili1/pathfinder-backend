import * as mongoose from 'mongoose'


export const mentorSchema = new mongoose.Schema({
    avatar: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    dob: {
        type: Date,
        // required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    organization: {
        type: String
    },
    yearsOfExperience: {
        type: String
    },
    levelOFExperience: {
        type: String
    },
    availabilty: {
        type: String
    },
    industry: {
        type: String
    },
    location: {
        type: String
    },
    resources:{
        type: Array
    },
    skills: {
        type: Array
    },
    interests: {
        type: Array
    },
    bio: {
        type: String
    },
    verificationPin: {
        type: String
    },
    pinUpdateTime: {
        type: Date
    },
    status: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

