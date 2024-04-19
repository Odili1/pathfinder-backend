import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MenteeService } from '../services/mentee.service';
import { Mentee } from '../interfaces/mentee.interface';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('mentee')
export class MenteeController {
    constructor(
        private menteeService: MenteeService
    ){}

    @UseGuards(AuthGuard)
    @Get(':id')
    async getOneMentee(@Param('id') id: string): Promise<Mentee>{
        return this.menteeService.getMenteeById(id)
    }
}
