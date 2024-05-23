import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MenteeService } from '../services/mentee.service';
import { IMentee } from '../../interfaces/mentee.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { MenteeBioDataDto } from '../../dtos/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('mentee')
export class MenteeController {
  constructor(private menteeService: MenteeService) {}

  @Get(':id')
  async getOneMentee(@Param('id') id: string): Promise<IMentee> {
    return this.menteeService.getMenteeById(id);
  }

  @Post(':id/update')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateMentee(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() mentorBioDataDto: MenteeBioDataDto): Promise<IMentee>{
    return this.menteeService.updateMentee(id, mentorBioDataDto, file)
  }
  
  // Route to get a single mentor
  @Get(':id')
  async getMenteeById(@Param('id') id: string): Promise<IMentee>{
    return this.menteeService.getMenteeById(id)
  }

  // Route to get all mentors
  @Get()
  async getAllMentees(): Promise<IMentee[]>{
    return this.menteeService.getAllMentee()
  }


}
