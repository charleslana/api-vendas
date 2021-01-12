import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from "./HandlebarsMailTemplate";

interface InterfaceMailContact {
    name: string;
    email: string;
}

interface InterfaceSendMail {
    to: InterfaceMailContact;
    from?: InterfaceMailContact;
    subject: string;
    templateData: InterfaceParseMailTemplate;
}

export default class EtherealMail {
    static async sendEmail({to, from, subject, templateData}: InterfaceSendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();

        const mailTemplate = new HandlebarsMailTemplate();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        const message = transporter.sendMail({
            from: {
                name: from?.name || 'Contact Api vendas',
                address: from?.email || 'contact@apivendas.com'
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await mailTemplate.parse(templateData)
        });

        console.log('Preview url: %s', nodemailer.getTestMessageUrl(await message));
    }
}