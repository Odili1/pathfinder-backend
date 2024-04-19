import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenteeController } from './modules/user/mentee/controllers/mentee.controller';
import { UserModule } from './modules/user/user.module';
import { MentorController } from './modules/user/mentor/controllers/mentor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { envConfig } from './config';
import { AuthController } from './modules/user/auth/auth.controller';

@Module({
  imports: [MongooseModule.forRoot(envConfig.DB_URI), UserModule],
  controllers: [
    AppController,
    MenteeController,
    MentorController,
    AuthController,
  ],
  providers: [AppService],
})
export class AppModule {}