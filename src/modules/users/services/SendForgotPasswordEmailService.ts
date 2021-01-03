import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import AppError from "../../../shared/errors/AppError";
import EtherealMail from "../../../config/mail/EtherealMail";
import path from "path";

interface InterfaceRequest {
    email: string;
}

class SendForgotPasswordEmailService {

    public async execute({email}: InterfaceRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);

        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('User does not exists.');
        }

        const {token} = await userTokenRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        await EtherealMail.sendEmail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: 'Recovery Password Api Vendas',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`
                }
            }
        });
    }
}

export default SendForgotPasswordEmailService;