export interface Mentor{
    fullname: string,
    age: number,
    dob: Date,
    email: string,
    password: string,
    status: boolean,
    verificationPin?: string,
    pinUpdateTime?: string
}