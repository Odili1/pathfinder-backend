import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MentorService } from 'src/modules/user/mentor/services/mentor.service';
// import { Roles } from 'src/common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private mentorService: MentorService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.getAllAndOverride<string>('role', [context.getHandler(), context.getClass()]);

    const {user} = context.switchToHttp().getRequest();

    console.log(`User: ${JSON.stringify(user)}, Role: ${role}`);
    
    if (!user){
      return true
    }

    const mentor = await this.mentorService.getMentorByEmail(user.email)
    
    if (role === 'mentor' && mentor){
      return true;
    }

  }
}
