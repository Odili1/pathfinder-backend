import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"


export class CreateLoginUserDto{
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

}


export class CreateSignupDto{
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsOptional()
    readonly verificationPin?: string
}


export class MentorBioDataDto{
    @IsString()
    @IsOptional()
    readonly avatar: string

    @IsString()
    @IsOptional()
    readonly name: string

    @IsString()
    @IsEmail()
    @IsOptional()
    readonly email: string

    @IsString()
    @IsOptional()
    readonly changePassword: string

    @IsEnum(['male', 'female', 'others'])
    @IsString()
    @IsOptional()
    readonly gender: string

    @IsOptional()
    @IsString()
    readonly organization: string

    @IsOptional()
    @IsString()
    readonly yearsOfExperience: string

    @IsOptional()
    @IsString()
    readonly levelOfExpertise: string

    @IsOptional()
    @IsString()
    readonly availabilty: string

    @IsOptional()
    @IsString()
    readonly industry: string

    @IsOptional()
    @IsString()
    readonly location: string

    @IsOptional()
    @IsArray()
    readonly interests: string[]

    @IsOptional()
    @IsArray()
    readonly skills: string[]

    @IsOptional()
    @IsArray()
    readonly resources: string[]

    @IsOptional()
    @IsString()
    readonly bio: string
}


export class MenteeBioDataDto{
    @IsString()
    @IsOptional()
    readonly avatar: string

    @IsString()
    @IsOptional()
    readonly name: string

    @IsString()
    @IsEmail()
    readonly email: string

    @IsString()
    @IsOptional()
    readonly changePassword: string

    @IsEnum(['male', 'female', 'others'])
    @IsString()
    @IsOptional()
    readonly gender: string

    @IsOptional()
    @IsString()
    readonly location: string
    
    @IsOptional()
    @IsString()
    readonly parentsEmail: string

    @IsOptional()
    readonly institution: string

    @IsOptional()
    @IsString()
    readonly skills: string[]

    @IsOptional()
    @IsString()
    readonly interests: string[]

    @IsOptional()
    @IsString()
    readonly bio: string
}


export class verificationPinDto{
    @IsNotEmpty()
    @IsString()
    readonly verificationPin: string
}


