import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { IResource } from "./interfaces/resource.interface";
import { CreateResourceDto, UpdateResourceDto } from "./dtos/resource.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { MentorService } from "../user/mentor/services/mentor.service";


@Injectable()
export class ResourceService{
    constructor(
        @InjectModel('Resource')
        private resourceModel: Model<IResource>,
        private mentorService: MentorService,
    ){}

    async createResource(mentorId: string, createResourceDto: CreateResourceDto): Promise<IResource>{
        console.log(`MentorID${mentorId}`);
        
        const newResource = {
            ...createResourceDto,
            mentorId: mentorId
        }
        if (!createResourceDto.title){
            throw new BadRequestException('Title is required')
        }

        const resource = await this.resourceModel.create(newResource)

        const mentor = await this.mentorService.updateMentor(mentorId, {resources: resource._id})

        console.log(`UpdateMentorResources: ${mentor}`);
        
        return resource
    }

    async updateResource(id: string, updateResourceDto: UpdateResourceDto): Promise<IResource>{
        const updatedResource = await this.resourceModel.findByIdAndUpdate(id, updateResourceDto)

        return updatedResource
    }

    async getAllResources(): Promise<IResource[]>{
        const resources = await this.resourceModel.find({}).populate({
            path: 'mentorId',
            select: '_id name email'
        })

        if (resources.length == 0){
            throw new NotFoundException('No Resource Found')
        }

        return resources
    }

    async getResourceById(id: string): Promise<any>{
        console.log(`getResourceById: id => ${id}`);
        
        const resource = await this.resourceModel.find({_id: id}).populate({
            path: 'mentorId',
            select: '_id name email'
        })

        console.log(resource);
        

        if (resource.length == 0){
            throw new NotFoundException('Resource Not Found')
        }

        return resource
    }

    async getResourceByMentor(mentorId: string): Promise<IResource[]>{
        const resources = await this.resourceModel.find({mentorId: mentorId})

        if (resources.length == 0){
            throw new NotFoundException('Resource Not Found')
        }

        return resources
    }
}