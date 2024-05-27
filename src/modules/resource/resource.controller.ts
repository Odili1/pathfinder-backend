import { Body, Controller, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ResourceService } from "./resource.service";
import { CreateResourceDto, UpdateResourceDto } from "./dtos/resource.dto";
import { IResource } from "./interfaces/resource.interface";
import { Request } from "express";
import { RolesGuard } from "src/common/guards/role.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { FilesInterceptor } from "@nestjs/platform-express";

@UseGuards(RolesGuard)
@Roles('mentor')
@Controller('resource')
export class ResourceController{
    constructor(
        private resourceService: ResourceService
    ){}


    @Post('create-resource')
    @UseInterceptors(FilesInterceptor('file'))
    async createResource(@UploadedFiles() files: Express.Multer.File[], @Body() createResourceDto: CreateResourceDto, @Req() req: Request): Promise<IResource>{
        // console.log(`createResources: ${files}`);
        // for (const file of files){
        //     console.log(file.originalname);
        // }
        const mentorId = req['user'].sub
        return this.resourceService.createResource(mentorId, createResourceDto, files)
    }
    
    @Post(':id/update')
    @UseInterceptors(FilesInterceptor('file'))
    async updateResource(@UploadedFiles() files: Express.Multer.File[], @Body() updateResource: UpdateResourceDto, @Param('id') id: string){
        console.log(`createResource: ${files}`);
        
        return this.resourceService.updateResource(id, updateResource, files)
    }
    

    @Public(true)
    @Get()
    async getAllRescources(): Promise<IResource[]>{
        return await this.resourceService.getAllResources()
    }
    
    // Get Resources created by a particular mentor
    @Get('my-resources')
    async getResourcesByMentor(@Req() req: Request): Promise<IResource[]>{
        const mentorId = req['user'].sub
        return this.resourceService.getResourceByMentor(mentorId)
    }

    @Public(true)
    @Get(':id')
    async getResource(@Param('id') id: string): Promise<IResource>{
        return await this.resourceService.getResourceById(id)
    }

}