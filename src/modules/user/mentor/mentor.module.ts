import { Module } from '@nestjs/common';
import { MentorController } from './controllers/mentor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mentorSchema } from './schema/mentor.schema';
import { PasswordService } from '../auth/passwordEncryption.service';
import { MentorService } from './services/mentor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Mentor',
        schema: mentorSchema,
      },
    ]),
  ],
  controllers: [MentorController],
  providers: [PasswordService, MentorService],
  exports: [MentorService],
})
export class MentorModule {}
