import { IsOptional, IsString } from "class-validator";


export class CreateResourceDto{
    @IsOptional()
    @IsString()
    readonly avatar: string;
    
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly company: string;

    @IsOptional()
    @IsString()
    readonly level: string;

    @IsOptional()
    @IsString()
    readonly noOfStudents: string;

    @IsOptional()
    @IsString()
    readonly courseDuration: string;

    @IsOptional()
    @IsString()
    readonly price: string;

    @IsOptional()
    readonly files: string[]

    @IsOptional()
    @IsString()
    readonly levelOfExpertise: string;

    @IsOptional()
    @IsString()
    readonly noOfStudentsGraduated: string;


}



export class UpdateResourceDto{
    @IsOptional()
    @IsString()
    readonly avatar: string;
    
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly company: string;

    @IsOptional()
    @IsString()
    readonly level: string;

    @IsOptional()
    @IsString()
    readonly noOfStudents: string;

    @IsOptional()
    @IsString()
    readonly courseDuration: string;

    @IsOptional()
    @IsString()
    readonly price: string;

    @IsOptional()
    readonly files: string[]

    @IsOptional()
    @IsString()
    readonly levelOfExpertise: string;

    @IsOptional()
    @IsString()
    readonly noOfStudentsGraduated: string;


}