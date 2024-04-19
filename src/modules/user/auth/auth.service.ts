import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MentorService } from '../mentor/services/mentor.service';
import { PasswordService } from './passwordEncryption.service';
import { MenteeService } from '../mentee/services/mentee.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private mentorService: MentorService,
    private menteeService: MenteeService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async validateMentor(email: string, password: string): Promise<any> {
    const mentor = await this.mentorService.getMentorByEmail(email);

    if (!mentor) {
      throw new UnauthorizedException(
        'INVALID EMAIL 0R PASSWORD. Not registered as a mentor',
      );
    }

    const validPassword = this.passwordService.validPassword(
      password,
      mentor.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('INVALID EMAIL OR PASSWORD');
    }

    return mentor;
  }

  async validateMentee(email: string, password: string): Promise<any> {
    const mentee = await this.menteeService.getMenteeByEmail(email);
    const validPassword = this.passwordService.validPassword(
      password,
      mentee.password,
    );
    const isVerified = mentee.status;

    if (!mentee) {
      throw new UnauthorizedException(
        'INVALID EMAIL 0R PASSWORD. Not registered as a mentee',
      );
    }

    if (!validPassword) {
      throw new UnauthorizedException('INVALID EMAIL OR PASSWORD');
    }

    if (!isVerified) {
      throw new UnauthorizedException('This user has not been verified');
    }

    return mentee;
  }

  async sendVerificationCode() {}

  async verifyUser() {}

  async login(user: any): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token: access_token,
    };
  }
}
