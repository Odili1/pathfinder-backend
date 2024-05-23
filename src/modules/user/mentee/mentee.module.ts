import { Module } from '@nestjs/common';
import { MenteeController } from './controllers/mentee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { menteeSchema } from './schema/mentee.schema';
import { PasswordService } from '../auth/passwordEncryption.service';
import { MenteeService } from './services/mentee.service';
import { CloudinaryService } from 'src/integrations/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Mentee', schema: menteeSchema }]),
  ],
  controllers: [MenteeController],
  providers: [PasswordService, MenteeService, CloudinaryService],
  exports: [MenteeService],
})
export class MenteeModule {}
