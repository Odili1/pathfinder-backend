import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mentor } from '../../interfaces/mentor.interface';
import { Model } from 'mongoose';
import { CreateSignupDto } from '../../dtos/user.dto';
import { PasswordService } from '../../auth/passwordEncryption.service';
import { updateOption } from '../../types/updateOption.type';

@Injectable()
export class MentorService {
  constructor(
    @InjectModel('Mentor')
    private mentorModel: Model<Mentor>,
    private passwordService: PasswordService,
  ) {}

  async createMentor(newMentor: CreateSignupDto): Promise<any> {
    const user = await this.mentorModel.findOne({ email: newMentor.email });

    if (user) {
      throw new BadRequestException('User with email already exist');
    }

    const password_hash = await this.passwordService.hashPassword(
      newMentor.password,
    );

    const createdMentor = await this.mentorModel.create({
      name: newMentor.name,
      email: newMentor.email,
      password: password_hash,
      verificationPin: newMentor.verificationPin
    });

    delete createdMentor.password;
    return createdMentor;
  }

  async getMentorByEmail(email: string): Promise<Mentor> {
    const user = await this.mentorModel.findOne({ email: email });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    return user;
  }

  async getMentorById(id: string): Promise<Mentor> {
    const user = await this.mentorModel.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    delete user.password
    return user;
  }

  async updateMentor(id: string, updateOption: object | updateOption): Promise<Mentor>{
    try {
      if (updateOption['changePassword']){
        // Hash the new password
        console.log(`Change password: ${updateOption['changePassword']}`);
        updateOption['password'] = await this.passwordService.hashPassword(updateOption['changePassword'])
      }
      const user = await this.mentorModel.findByIdAndUpdate(id, updateOption)

      delete user['password']
      
      return user
      
    } catch (error){
      console.log(error);
      
        throw new BadRequestException(`${error}`)
    }
  }
}
