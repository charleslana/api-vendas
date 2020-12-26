import nodemailer from 'nodemailer';

interface InterfaceSendMail {
    to: string;
    body: string;
}

export default class EtherealMail {
    static async sendEmail({to, body}: InterfaceSendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();

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
            from: 'contact@apivendas.com',
            to,
            subject: 'Password recovery',
            text: body
        });

        console.log('Preview url: %s', nodemailer.getTestMessageUrl(await message));
    }
}