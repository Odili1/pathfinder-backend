import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { MentorService } from '../mentor/services/mentor.service';
import { MenteeService } from '../mentee/services/mentee.service';
import { CreateLoginUserDto, CreateSignupDto } from '../dtos/user.dto';

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

    return await this.mentorService.createMentor({ fullname, email, password });
  }

  @Post('mentor/login')
  async loginMentor(@Body() createLoginUserDto: CreateLoginUserDto) {
    const { email, password } = createLoginUserDto;

    const user = await this.authService.validateMentor(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  // MENTEE AUTH
  @Post('mentee/signup')
  async signUpMentee(@Body() createSignupDto: CreateSignupDto): Promise<any> {
    const { fullname, email, password, confirmPassword } = createSignupDto;

    if (password != confirmPassword) {
      throw new BadRequestException(
        'password and confrim password should be the same',
      );
    }

    return await this.menteeService.createMentee({ fullname, email, password });
  }

  @Post('mentee/login')
  async loginMentee(@Body() createLoginUserDto: CreateLoginUserDto) {
    const { email, password } = createLoginUserDto;

    const user = await this.authService.validateMentee(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }
}
