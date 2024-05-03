import { Module } from "@nestjs/common";
import { ResourceService } from "./resource.service";
import { ResourceController } from "./resource.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { resourceSchema } from "./schema/resource.schema";
import { MentorModule } from "../user/mentor/mentor.module";

@Module({
    imports: [MentorModule, MongooseModule.forFeature([{name: 'Resource', schema: resourceSchema}])],
    controllers: [ResourceController],
    providers: [ResourceService],
    exports: [ResourceService]
})
export class ResourceModule{}