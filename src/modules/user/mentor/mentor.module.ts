import { Module } from '@nestjs/common';
import { MentorController } from './controllers/mentor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mentorSchema } from './schema/mentor.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Mentor', schema: mentorSchema}])],
    controllers: [MentorController],
    providers: []
})
export class MentorModule {}
