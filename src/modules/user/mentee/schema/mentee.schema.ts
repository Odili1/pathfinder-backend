import * as mongoose from 'mongoose'


export const menteeSchema = new mongoose.Schema({
    fullname: {
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

