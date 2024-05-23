import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { IMentor } from "../../interfaces/mentor.interface";
import { MentorBioDataDto } from "../../dtos/user.dto";
import { MentorService } from "../services/mentor.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/common/guards/role.guard";
import { Public } from "src/common/decorators/public.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
// import { CloudinaryService } from "src/integrations/cloudinary/cloudinary.service";


// @UseGuards(AuthGuard)
@UseGuards(RolesGuard)
@Roles('mentor')
@Controller('mentor')
export class MentorController{
    constructor(
        private mentorService: MentorService,
        // private cloudinaryService: CloudinaryService
    ){}

    // Route for update
    @Post(':id/update')
    @UseInterceptors(FileInterceptor('avatar'))
    async updateMentor(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() mentorBioDataDto: MentorBioDataDto): Promise<IMentor>{
        try {
            // for (const filename in files){
            //     for (const file of files[filename]){
            //         console.log(`File Received: ${file.originalname}`);
            //     }
            // }
            // console.log(files.resource[0].originalname);
            console.log(`File Received: ${file}`);
            return this.mentorService.updateMentor(id, mentorBioDataDto, file)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    // Route to get a single mentor
    @Get(':id')
    async getMentorById(@Param('id') id: string): Promise<IMentor>{
        return this.mentorService.getMentorById(id)
    }

    // Route to get all mentors
    @Public(true)
    @Get()
    async getAllMentors(): Promise<IMentor[]>{
        return this.mentorService.getAllMentors()
    }
}