import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"


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
    readonly fullname: string;

    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly confirmPassword?: string

    @IsOptional()
    readonly verificationPin?: string
}

export class mentorBioDataDto{
    @IsString()
    readonly name: string

    @IsEnum(['male', 'female', 'others'])
    @IsString()
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
}


export class menteeBioDataDto{
    @IsString()
    readonly name: string

    @IsEnum(['male', 'female', 'others'])
    @IsString()
    readonly gender: string

    @IsOptional()
    @IsString()
    readonly location: string
    
    @IsOptional()
    @IsString()
    readonly parentsEmail: string

    @IsOptional()
    @IsString()
    readonly skills: string

    @IsOptional()
    @IsString()
    readonly interests?: object
}


export class verificationPinDto{
    @IsNotEmpty()
    @IsString()
    readonly verificationPin: string
}


