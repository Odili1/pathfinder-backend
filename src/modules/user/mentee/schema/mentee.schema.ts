import * as mongoose from 'mongoose'


export const menteeSchema = new mongoose.Schema({
    avatar: {
        type: String
    },
    name: {
        type: String
    },
    age: {
        type: Number
    },
    dob: {
        type: Date
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    location: {
        type: String
    },
    parentsEmail: {
        type: String
    },
    institution: {
        type: String
    },
    skills: {
        types: Array
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

