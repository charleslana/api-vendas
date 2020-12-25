import {getCustomRepository} from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import path from "path";
import uploadConfig from '../../../config/upload'
import * as fs from "fs";

interface InterfaceRequest {
    userId: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {

    public async execute({userId, avatarFilename}: InterfaceRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(userId);

        if(!user) {
            throw new AppError('User not found.');
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;