import { Module } from "@nestjs/common";
import { MenteeModule } from "./mentee/mentee.module";
import { MentorModule } from "./mentor/mentor.module";

@Module({
    imports: [MenteeModule, MentorModule],
    exports: [MenteeModule, MentorModule]
})
export class UserModule{}