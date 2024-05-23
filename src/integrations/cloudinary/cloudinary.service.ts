import { BadRequestException, Injectable } from "@nestjs/common";
import {UploadApiErrorResponse, UploadApiResponse, v2} from 'cloudinary'
import { envConfig } from "src/config";
import { Readable } from "stream";



@Injectable()
export class CloudinaryService{
    async upload_file(file: Express.Multer.File): Promise<UploadApiResponse|UploadApiErrorResponse>{
        // Cloudinary Configuration
        v2.config({
            cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
            api_key: envConfig.CLOUDINARY_API_KEY,
            api_secret: envConfig.CLOUDINARY_API_SECRET
        })

        // Debugging the file properties
        console.log('File properties:', {
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            bufferType: typeof file.buffer,
        });

        if (typeof file.size !== 'number' || isNaN(file.size)) {
            throw new BadRequestException('Invalid file size');
        }
        
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({resource_type: 'auto'}, (error, result) => {
                console.log(`CloudinaryUploadStream: ${error}`);
                if (error) return reject(error)
                resolve(result)
            })
            
            // toStream(file.buffer).pipe(upload)
            // streamifier.createReadStream(file.buffer).pipe(upload)
            // file.stream.pipe(upload)
            const readableStream = new Readable()
            readableStream.push(file.buffer)
            readableStream.push(null)
            readableStream.pipe(upload)
        })
    }
}
