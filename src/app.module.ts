import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenteeController } from './modules/user/mentee/controllers/mentee.controller';
import { UserModule } from './modules/user/user.module';
import { MentorController } from './modules/user/mentor/controllers/mentor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { envConfig } from './config';
import { AuthController } from './modules/user/auth/auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './modules/user/auth/mailing.service';
import { ResourceModule } from './modules/resource/resource.module';
import { ResourceController } from './modules/resource/resource.controller';

console.log(`configurin multer`);

@Module({
  imports: [
    MongooseModule.forRoot(envConfig.DB_URI), 
    UserModule,
    ResourceModule,
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: envConfig.MAILADDRESS,
          pass: envConfig.MAILPASS
        }
      }
    }),
  ],
  controllers: [
    AppController,
    MenteeController,
    MentorController,
    AuthController,
    ResourceController
  ],
  providers: [AppService, MailService],
})
export class AppModule {}
