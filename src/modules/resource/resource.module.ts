import { Module } from "@nestjs/common";
import { ResourceService } from "./resource.service";
import { ResourceController } from "./resource.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { resourceSchema } from "./schema/resource.schema";
import { MentorModule } from "../user/mentor/mentor.module";
import { CloudinaryService } from "src/integrations/cloudinary/cloudinary.service";

@Module({
    imports: [MentorModule, MongooseModule.forFeature([{name: 'Resource', schema: resourceSchema}])],
    controllers: [ResourceController],
    providers: [ResourceService, CloudinaryService],
    exports: [ResourceService]
})
export class ResourceModule{}