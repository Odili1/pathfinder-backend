import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { IMentor } from "../../interfaces/mentor.interface";
import { MentorBioDataDto } from "../../dtos/user.dto";
import { MentorService } from "../services/mentor.service";
// import { AuthGuard } from "src/common/guards/auth.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/common/guards/role.guard";


// @UseGuards(AuthGuard)
@UseGuards(RolesGuard)
@Roles('mentor')
@Controller('mentor')
export class MentorController{
    constructor(
        private mentorService: MentorService
    ){}

    // Route for update
    @Post(':id/update')
    // @Public(true)
    async updateMentor(@Param('id') id: string, @Body() mentorBioDataDto: MentorBioDataDto): Promise<IMentor>{
        return this.mentorService.updateMentor(id, mentorBioDataDto)
    }

    // Route to get a single mentor
    @Get(':id')
    async getMentorById(@Param('id') id: string): Promise<IMentor>{
        return this.mentorService.getMentorById(id)
    }

    // Route to get all mentors
    @Get()
    async getAllMentors(): Promise<IMentor[]>{
        return this.mentorService.getAllMentors()
    }
}