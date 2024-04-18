import { Module } from '@nestjs/common';
import { MenteeController } from './controllers/mentee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { menteeSchema } from './schema/mentee.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Mentee', schema: menteeSchema}])],
    controllers: [MenteeController],
    providers: []
})
export class MenteeModule {}
