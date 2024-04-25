import {
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
import { Public } from 'src/common/decorators/public.decorator';

console.log('authcontroller');
@Public(true)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mentorService: MentorService,
    private menteeService: MenteeService,
  ) {}

  @Post('mentor/signup')
  async signUpMentor(@Body() createSignupDto: CreateSignupDto): Promise<any> {
    const { name, email, password } = createSignupDto;

    // Generating 4Digit Random Pin
    let verificationPin: string = ''
    for (let i = 0; i < 4; i++){
      verificationPin = verificationPin + `${Math.floor(Math.random() * 10)}`
    }

    // Create User in DB
    console.log('Mentor creation');
    const newMentor = await this.mentorService.createMentor({ name, email, password, verificationPin });

    // Sending Pin to Email
    console.log('sending mail');
    await this.authService.sendVerificationMail(name, email, verificationPin)
    
    // Removing the verification Pin and Password from Response

    return newMentor

    // Generate token to track user during Pin Verification
    // return await this.authService.generateAccessToken({email, password})
  }

  @Post('mentor/:id/verify')
  async verifyAccoutCreation(@Param('id') id: string, @Body() pin: verificationPinDto): Promise<any>{
      return await this.authService.verifyMentor(id, pin)
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
    const { name, email, password } = createSignupDto;

    // Generating 4Digit Random Pin
    let verificationPin: string = ''
    for (let i = 0; i < 4; i++){
      verificationPin = verificationPin + `${Math.floor(Math.random() * 10)}`
    }

    const newmentee = await this.menteeService.createMentee({ name, email, password, verificationPin });

    // Sending Pin to Email
    await this.authService.sendVerificationMail(name, email, verificationPin)

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
