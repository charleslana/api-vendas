import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import AppError from "../../../shared/errors/AppError";

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

        const token = await userTokenRepository.generate(user.id);
    }
}

export default SendForgotPasswordEmailService;