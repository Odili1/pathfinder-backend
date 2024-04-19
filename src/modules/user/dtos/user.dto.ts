import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"



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

export class verificationPinDto{
    @IsNotEmpty()
    @IsString()
    readonly verificationPin: string
}


