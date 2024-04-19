import * as mongoose from 'mongoose'


export const mentorSchema = new mongoose.Schema({
    fullname: {
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

