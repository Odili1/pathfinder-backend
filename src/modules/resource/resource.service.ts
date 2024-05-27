import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { IResource } from "./interfaces/resource.interface";
import { CreateResourceDto, UpdateResourceDto } from "./dtos/resource.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { MentorService } from "../user/mentor/services/mentor.service";
import { CloudinaryService } from "src/integrations/cloudinary/cloudinary.service";


@Injectable()
export class ResourceService{
    constructor(
        @InjectModel('Resource')
        private resourceModel: Model<IResource>,
        private mentorService: MentorService,
        private cloudinaryService: CloudinaryService
    ){}

    async createResource(mentorId: string, createResourceDto: CreateResourceDto, files: Express.Multer.File[]): Promise<IResource>{
        console.log(`MentorID${mentorId}`);
        
        const newResource = {
            ...createResourceDto,
            mentorId: mentorId,
            files: []
        }

        if (!createResourceDto.title){
            throw new BadRequestException('Title is required')
        }

        if (files){
            for (const file of files){
                const fileString = await this.cloudinaryService.upload_file(file).then((data) => data.secure_url).catch((error) => {
                    throw new BadRequestException(error)
                })
                newResource.files = [...newResource.files, fileString]
            }
        }

        const resource = await this.resourceModel.create(newResource)


        const mentor = await this.mentorService.updateMentor(mentorId, {resources: resource._id})

        console.log(`UpdateMentorResources: ${mentor}`);
        
        return resource
    }

    async updateResource(id: string, updateResourceDto: UpdateResourceDto, files: Express.Multer.File[]): Promise<IResource>{
        const updatedResource = await this.resourceModel.findByIdAndUpdate(id, updateResourceDto)
        
        if (files){
            for (const file of files){
                const fileString = await this.cloudinaryService.upload_file(file).then((data) => {
                    console.log(`avatarData: ${JSON.stringify(data)}`);
                    
                    return data.secure_url
                }).catch((error)=> {throw new BadRequestException(error)})
                
                updatedResource["files"] = [...updatedResource["files"], fileString]
            }
        }

        updatedResource.save()
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