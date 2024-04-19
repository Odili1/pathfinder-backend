import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { envConfig } from "src/config";


@Injectable()
export class MailService{
    constructor(
        private mailService: MailerService
    ){}

    async sendMail(option: any): Promise<void>{
        console.log('MailerService');
        
        await this.mailService.sendMail({
            from: envConfig.MAILADDRESS,
            to: option.mailto,
            subject: option.subject,
            html: option.html
            
        })
    }
}