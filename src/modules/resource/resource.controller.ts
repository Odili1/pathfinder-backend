import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ResourceService } from "./resource.service";
import { CreateResourceDto, UpdateResourceDto } from "./dtos/resource.dto";
import { IResource } from "./interfaces/resource.interface";
import { Request } from "express";
import { RolesGuard } from "src/common/guards/role.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { Public } from "src/common/decorators/public.decorator";

@UseGuards(RolesGuard)
@Roles('mentor')
@Controller('resource')
export class ResourceController{
    constructor(
        private resourceService: ResourceService
    ){}


    @Post('create-resource')
    async createResource(@Body() createResourceDto: CreateResourceDto, @Req() req: Request): Promise<IResource>{
        const mentorId = req['user'].sub
        return this.resourceService.createResource(mentorId, createResourceDto)
    }

    @Post(':id/update')
    async updateResource(@Body() updateResource: UpdateResourceDto, @Param('id') id: string){
        return this.resourceService.updateResource(id, updateResource)
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