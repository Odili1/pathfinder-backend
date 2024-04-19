export interface Mentee{
    fullname: string,
    age: number,
    dob: Date,
    email: string,
    password: string,
    status: boolean,
    verificationPin?: string,
    pinUpdateTime?: string
}