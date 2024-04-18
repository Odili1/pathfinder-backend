import * as mongoose from 'mongoose'


export const menteeSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
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
    verification_pin: {
        type: String
    },
    pin_update_time: {
        type: Date
    },
    status: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

