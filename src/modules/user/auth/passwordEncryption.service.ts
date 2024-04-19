import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class PasswordService{
    constructor(){}

    async hashPassword(userPassword: string): Promise<string>{
        const saltRound = 10
        const hashedPassword = await bcrypt.hash(userPassword, saltRound)

        return hashedPassword
    }


    async validPassword(userPassword: string, hashedPassword: string): Promise<boolean>{
        return await bcrypt.compare(userPassword, hashedPassword)
    }

}


