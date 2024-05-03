import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IMentor } from '../../interfaces/mentor.interface';
import { Model } from 'mongoose';
import { CreateSignupDto } from '../../dtos/user.dto';
import { PasswordService } from '../../auth/passwordEncryption.service';
import { updateOption } from '../../types/updateOption.type';

@Injectable()
export class MentorService {
  constructor(
    @InjectModel('Mentor')
    private mentorModel: Model<IMentor>,
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

    delete createdMentor['verificationPin']
    // const {verificationPin, password, ...rest} = createdMentor
    console.log(`createMentor: ${createdMentor}`);
    return createdMentor
  }

  async getMentorByEmail(email: string): Promise<IMentor> {
    const user = await this.mentorModel.findOne({ email: email }, {verificationPin: 0});

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found. Not a registered mentor`);
    }

    console.log(`getMentorByEmail: ${user}`);
    return user;
  }

  async getMentorById(id: string): Promise<IMentor> {
    const user = await this.mentorModel.findOne({ _id: id }, {password: 0});

    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    console.log(`getMentorById: ${user}`);
    
    return user;
  }

  async getAllMentors(): Promise<IMentor[]>{
    const mentors = await this.mentorModel.find({}, {password: 0, verificationPin: 0})

    if (mentors.length == 0){
      throw new NotFoundException('No Mentors found')
    }

    return mentors
  }

  async updateMentor(id: string, updateOption: object | updateOption): Promise<IMentor>{
    try {
      if (updateOption['changePassword']){
        // Hash the new password
        console.log(`Change password: ${updateOption['changePassword']}`);
        updateOption['password'] = await this.passwordService.hashPassword(updateOption['changePassword'])
      }
      const user = await this.mentorModel.findByIdAndUpdate(id, updateOption)

      if (!user){
        throw new ForbiddenException('You cannot update another user')
      }
      
      // const {verificationPin, password, ...rest} = user
      console.log(`updateMentor: ${user}`);
      return user
      
    } catch (error){
      console.log(`UpdateError: ${error}`);
      
      throw new BadRequestException(`${error}`)
    }
  }
}
