import { Module } from '@nestjs/common';
import { MenteeModule } from './mentee/mentee.module';
import { MentorModule } from './mentor/mentor.module';
import { AuthService } from './auth/auth.service';
import { PasswordService } from './auth/passwordEncryption.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from 'src/config';
import { MailService } from './auth/mailing.service';

@Module({
  imports: [
    MenteeModule,
    MentorModule,
    JwtModule.register({
      global: true,
      secret: envConfig.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, PasswordService, MailService],
  controllers: [AuthController],
  exports: [MenteeModule, MentorModule, AuthService],
})
export class UserModule {}
