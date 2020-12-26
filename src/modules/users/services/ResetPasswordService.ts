import {getCustomRepository} from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import AppError from "../../../shared/errors/AppError";
import {isAfter, addHours} from 'date-fns';
import {hash} from 'bcryptjs';

interface InterfaceRequest {
    token: string;
    password: string;
}

class ResetPasswordService {

    public async execute({token, password}: InterfaceRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);

        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokenRepository.findByToken(token);

        if(!userToken) {
            throw new AppError('User token does not exists.');
        }

        const user = await usersRepository.findById(userToken.user_id);

        if(!user) {
            throw new AppError('User does not exists.');
        }

        const tokenCreatedAt = userToken.created_at;

        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.');
        }

        user.password = await hash(password, 10);

        await usersRepository.save(user);

    }
}

export default ResetPasswordService;