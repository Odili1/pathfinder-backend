import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IMentee } from '../../interfaces/mentee.interface';
import { CreateSignupDto } from '../../dtos/user.dto';
import { PasswordService } from '../../auth/passwordEncryption.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { updateOption } from '../../types/updateOption.type';
import { CloudinaryService } from 'src/integrations/cloudinary/cloudinary.service';

@Injectable()
export class MenteeService {
  constructor(
    @InjectModel('Mentee')
    private menteeModel: Model<IMentee>,
    private passwordService: PasswordService,
    private cloudinaryService: CloudinaryService
  ) {}

  async createMentee(newMentee: CreateSignupDto) {
    const user = await this.menteeModel.findOne({ email: newMentee.email });

    if (user) {
      throw new BadRequestException('User with email already exist');
    }

    const password_hash = await this.passwordService.hashPassword(
      newMentee.password,
    );

    const createdMentee = await this.menteeModel.create({
      name: newMentee.name,
      email: newMentee.email,
      password: password_hash,
      verificationPin: newMentee.verificationPin,
    });

    delete createdMentee.password;
    return createdMentee;
  }

  async getMenteeByEmail(email: string): Promise<IMentee> {
    const user = await this.menteeModel.findOne({ email: email }, {verificationPin: 0});

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found. You might have registered as a mentor`);
    }

    return user;
  }

  async getMenteeById(id: string): Promise<IMentee> {
    const user = await this.menteeModel.findOne({ _id: id }, {password: 0});

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async getAllMentee(): Promise<IMentee[]>{
    const mentees = await this.menteeModel.find({}, {password: 0, verificationPin: 0})

    if (mentees.length == 0){
      throw new NotFoundException('No mentees found')
    }

    return mentees
  }

  async updateMentee(id: string, updateOption: object | updateOption, file?: Express.Multer.File): Promise<IMentee>{
    try {
      if (updateOption['changePassword']){
        // Hash the new password
        console.log(`Change password: ${updateOption['changePassword']}`);
        updateOption['password'] = await this.passwordService.hashPassword(updateOption['changePassword'])
      }

      // Upload Multiple FIles
      // console.log(`updateMentorFile: ${JSON.stringify(files)}`);
      if (file){
        console.log(`File Received: ${file.originalname}`);
        const avatar = await this.cloudinaryService.upload_file(file).then((data) => {
          console.log(`avatarData: ${JSON.stringify(data)}`);
          
          return data.secure_url
        }).catch((error)=> {throw new BadRequestException(error)})

        updateOption['avatar'] = avatar
      }

      const user = await this.menteeModel.findByIdAndUpdate(id, updateOption)

      delete user['password']
      
      return user
      
    } catch (error){
      console.log(error);
      
        throw new BadRequestException(`${error}`)
    }
  }


}
