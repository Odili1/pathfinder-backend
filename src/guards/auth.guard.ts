import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { envConfig } from "src/config";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwtService: JwtService
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHader(request);

        if (!token){
            throw new UnauthorizedException('Login or Signup to continue')
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: envConfig.JWT_SECRET})

            request['user'] = payload
        } catch{
            throw new UnauthorizedException('Login or Signup to continue')
        }

        return true
    }

    private extractTokenFromHader(request: Request): string | undefined{
        const [type, token] = request.headers.authorization?.split(' ') ?? []

        return type == 'Bearer' ? token : undefined
    }
}