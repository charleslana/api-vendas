import {getCustomRepository} from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import {compare, hash} from 'bcryptjs';

interface InterfaceRequest {
    userId: string;
    name: string;
    email: string;
    password?: string;
    oldPassword?: string;
}

class UpdateProfileService {

    public async execute({userId, name, email, password, oldPassword}: InterfaceRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(userId);

        if(!user) {
            throw new AppError('User not found.');
        }

        const userUpdateEmail = await usersRepository.findByEmail(email);

        if(userUpdateEmail && userUpdateEmail.id != userId) {
            throw new AppError('There is already one user with this email.');
        }

        if(password && !oldPassword) {
            throw new AppError('Old password is required.');
        }

        if(password && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password);

            if(!checkOldPassword) {
                throw new AppError('Old password does not match.');
            }

            user.password = await hash(password, 10);
        }

        user.name = name;

        user.email = email;

        await usersRepository.save(user);

        return user;

    }
}

export default UpdateProfileService;