import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mentor } from '../interfaces/mentor.interface';
import { Model } from 'mongoose';
import { CreateSignupDto } from '../../dtos/user.dto';
import { PasswordService } from '../../auth/passwordEncryption.service';

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
      fullname: newMentor.fullname,
      email: newMentor.email,
      password: password_hash,
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
}
