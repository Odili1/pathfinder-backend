import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MentorService } from '../mentor/services/mentor.service';
import { PasswordService } from './passwordEncryption.service';
import { MenteeService } from '../mentee/services/mentee.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from './mailing.service';
import { IMailOption } from '../interfaces/mailOption.interface';
import { verificationPinDto } from '../dtos/user.dto';



@Injectable()
export class AuthService {
  constructor(
    private mentorService: MentorService,
    private menteeService: MenteeService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async validateMentor(email: string, password: string): Promise<any> {
    const mentor = await this.mentorService.getMentorByEmail(email);
    const validPassword = this.passwordService.validPassword(
      password,
      mentor.password,
    );
    const isVerified = mentor.status;

    if (!mentor) {
      throw new UnauthorizedException(
        'INVALID EMAIL 0R PASSWORD. Not registered as a mentor',
      );
    }

    if (!validPassword) {
      throw new UnauthorizedException('INVALID EMAIL OR PASSWORD');
    }

    if (!isVerified) {
      throw new UnauthorizedException('This user has not been verified');
    }

    return mentor;
  }

  async verifyMentor(pin: verificationPinDto, id: string) {
    const user = await this.mentorService.getMentorById(id)

    if (!user){
      throw new NotFoundException('User not found')
    }

    if (user.verificationPin != pin.verificationPin){
      throw new BadRequestException('Wrong Pin. Please input the pin sent to your mail')
    }

   await this.mentorService.updateMentor(id, {status: true})

    //  Send Account Verified Mail
    const option: IMailOption = {
      mailto: user.email,
      subject: 'Verify Account',
      html: `
          <p>Hey ${user.fullname},</p>
          <br>
          <p>Your account has been activated.</p>
          <br>
          <p>Proceed to log into your account</p>
        ` 
    }

    await this.mailService.sendMail(option)

   return user
  }




  // ----- MENTEE -----


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

  async verifyMentee(pin: verificationPinDto, id: string) {
    const user = await this.menteeService.getMenteeById(id)

    if (!user){
      throw new NotFoundException('User not found')
    }

    if (user.verificationPin != pin.verificationPin){
      throw new BadRequestException('Wrong Pin. Please input the pin sent to your mail')
    }

   await this.menteeService.updateMentee(id, {status: true})

    //  Send Account Verified Mail
    const option: IMailOption = {
      mailto: user.email,
      subject: 'Verify Account',
      html: `
          <p>Hey ${user.fullname},</p>
          <br>
          <p>Your account has been activated.</p>
          <br>
          <p>Proceed to log into your account</p>
        ` 
    }

    await this.mailService.sendMail(option)

   return user
  }

  

  // General Purpose
  async generateAccessToken(user: any): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token: access_token,
    };
  }

  async sendVerificationMail(fullname: string, email: string, pin: string): Promise<void>{
    const option: IMailOption = {
      mailto: email,
      subject: 'Verify Account',
      html: `
          <p>Hey ${fullname},</p>
          <br>
          <p>You are almost there!. Use the code below to verify your email and proceed</p>
          <h2><b>${pin}</b></h2>
          <br>
          <p>Note that this code will be valid for 2 minutes. Do not share this code</p>
        ` 
    }

    await this.mailService.sendMail(option)
  }
}
