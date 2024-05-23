import { Module } from '@nestjs/common';
import { MenteeModule } from './mentee/mentee.module';
import { MentorModule } from './mentor/mentor.module';
import { AuthService } from './auth/auth.service';
import { PasswordService } from './auth/passwordEncryption.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from 'src/config';
import { MailService } from './auth/mailing.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CloudinaryService } from 'src/integrations/cloudinary/cloudinary.service';


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
  providers: [AuthService, PasswordService, MailService, CloudinaryService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  controllers: [AuthController],
  exports: [MenteeModule, MentorModule, AuthService],
})
export class UserModule {}

// {
//   provide: APP_GUARD,
//   useClass: AuthGuard
// }