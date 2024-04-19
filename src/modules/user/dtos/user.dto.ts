import { IsEmail, IsNotEmpty, IsString } from "class-validator"



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
}

