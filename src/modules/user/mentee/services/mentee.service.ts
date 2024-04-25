import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Mentee } from '../../interfaces/mentee.interface';
import { CreateSignupDto } from '../../dtos/user.dto';
import { PasswordService } from '../../auth/passwordEncryption.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { updateOption } from '../../types/updateOption.type';

@Injectable()
export class MenteeService {
  constructor(
    @InjectModel('Mentee')
    private menteeModel: Model<Mentee>,
    private passwordService: PasswordService,
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

  async getMenteeByEmail(email: string): Promise<Mentee> {
    const user = await this.menteeModel.findOne({ email: email }, {verificationPin: 0});

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    return user;
  }

  async getMenteeById(id: string): Promise<Mentee> {
    const user = await this.menteeModel.findOne({ _id: id }, {password: 0});

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async getAllMentee(): Promise<Mentee[]>{
    const mentees = await this.menteeModel.find({}, {password: 0, verificationPin: 0})

    if (mentees.length == 0){
      throw new NotFoundException('No Mentors found')
    }

    return mentees
  }

  async updateMentee(id: string, updateOption: object | updateOption): Promise<Mentee>{
    try {
      if (updateOption['changePassword']){
        // Hash the new password
        console.log(`Change password: ${updateOption['changePassword']}`);
        updateOption['password'] = await this.passwordService.hashPassword(updateOption['changePassword'])
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
