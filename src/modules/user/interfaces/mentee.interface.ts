export interface IMentee{
    avatar?: string
    name: string,
    age: number,
    dob: Date,
    email: string,
    password: string,
    status: boolean,
    gender?: string,
    institution?: string,
    location?: string,
    parentsEmail?: string,
    skills?: string[],
    interests?: string[],
    verificationPin?: string,
    pinUpdateTime?: string
}