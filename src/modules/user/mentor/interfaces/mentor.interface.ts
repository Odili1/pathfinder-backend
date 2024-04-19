export interface Mentor{
    firstName: string,
    lastName: string,
    age: number,
    dob: Date,
    email: string,
    password: string,
    status: boolean,
    verification_pin?: string,
    pin_update_time?: string
}