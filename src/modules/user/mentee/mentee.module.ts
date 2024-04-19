import { Module } from '@nestjs/common';
import { MenteeController } from './controllers/mentee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { menteeSchema } from './schema/mentee.schema';
import { PasswordService } from '../auth/passwordEncryption.service';
import { MenteeService } from './services/mentee.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Mentee', schema: menteeSchema }]),
  ],
  controllers: [MenteeController],
  providers: [PasswordService, MenteeService],
  exports: [MenteeService],
})
export class MenteeModule {}
