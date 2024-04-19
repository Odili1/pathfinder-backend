import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { MentorService } from '../mentor/services/mentor.service';
import { MenteeService } from '../mentee/services/mentee.service';
import { CreateLoginUserDto, CreateSignupDto, verificationPinDto } from '../dtos/user.dto';

console.log('authcontroller');
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mentorService: MentorService,
    private menteeService: MenteeService,
  ) {}

  @Post('mentor/signup')
  async signUpMentor(@Body() createSignupDto: CreateSignupDto): Promise<any> {
    const { fullname, email, password, confirmPassword } = createSignupDto;

    if (password != confirmPassword) {
      throw new BadRequestException(
        'password and confrim password should be the same',
      );
    }

    // Generating 4Digit Random Pin
    let verificationPin: string = ''
    for (let i = 0; i < 4; i++){
      verificationPin = verificationPin + `${Math.floor(Math.random() * 10)}`
    }

    // Create User in DB
    console.log('Mentor creation');
    const newMentor = await this.mentorService.createMentor({ fullname, email, password, verificationPin });

    // Sending Pin to Email
    console.log('sending mail');
    await this.authService.sendVerificationMail(fullname, email, verificationPin)
    
    return newMentor

    // Generate token to track user during Pin Verification
    // return await this.authService.generateAccessToken({email, password})
  }

  @Post('mentor/:id/verify')
  async verifyAccoutCreation(@Body() pin: verificationPinDto, @Param('id') id: string): Promise<any>{
      return await this.authService.verifyMentor(pin, id)
  }

  @Post('mentor/login')
  async loginMentor(@Body() createLoginUserDto: CreateLoginUserDto): Promise<any> {
    const { email, password } = createLoginUserDto;

    const user = await this.authService.validateMentor(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Login User
    return await this.authService.generateAccessToken(user);
  }



  // ----- MENTEE AUTH -----


  @Post('mentee/signup')
  async signUpMentee(@Body() createSignupDto: CreateSignupDto): Promise<any> {
    const { fullname, email, password, confirmPassword } = createSignupDto;

    if (password != confirmPassword) {
      throw new BadRequestException(
        'password and confrim password should be the same',
      );
    }

    // Generating 4Digit Random Pin
    let verificationPin: string = ''
    for (let i = 0; i < 4; i++){
      verificationPin = verificationPin + `${Math.floor(Math.random() * 10)}`
    }

    const newmentee = await this.menteeService.createMentee({ fullname, email, password, verificationPin });

    // Sending Pin to Email
    await this.authService.sendVerificationMail(fullname, email, verificationPin)

    return newmentee
    // return this.authService.generateAccessToken({email, password})
  }

  @Post('mentee/:id/verify')
  async verifyMenteeAccoutCreation(@Body() pin: verificationPinDto, @Param('id') id: string): Promise<any>{
      return await this.authService.verifyMentee(pin, id)
  }


  @Post('mentee/login')
  async loginMentee(@Body() createLoginUserDto: CreateLoginUserDto) {
    const { email, password } = createLoginUserDto;

    const user = await this.authService.validateMentee(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Login User
    return this.authService.generateAccessToken(user);
  }
}
