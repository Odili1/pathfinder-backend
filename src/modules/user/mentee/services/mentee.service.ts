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
      fullname: newMentee.fullname,
      email: newMentee.email,
      password: password_hash,
      verificationPin: newMentee.verificationPin,
    });

    delete createdMentee.password;
    return createdMentee;
  }

  async getMenteeByEmail(email: string): Promise<Mentee> {
    const user = await this.menteeModel.findOne({ email: email });

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    return user;
  }

  async getMenteeById(id: string): Promise<Mentee> {
    const user = await this.menteeModel.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async updateMentee(id: string, updateOption: object): Promise<Mentee> {
    try {
      const user = await this.menteeModel.findByIdAndUpdate(id, updateOption);

      return user;
    } catch {
      throw new BadRequestException();
    }
  }
}
