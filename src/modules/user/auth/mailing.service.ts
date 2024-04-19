import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer"


@Injectable()
export class MailService{
    constructor(){}

    async sendMail(mailOptions: object){
        const transporter = nodemailer.create
    }
}