import {getCustomRepository} from "typeorm";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import {compare} from "bcryptjs";

interface InterfaceRequest {
    email: string;
    password: string;
}

class CreateSessionsService {

    public async execute({email, password}: InterfaceRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('Invalid credentials.', 401);
        }

        const passwordConfirmed = await compare(password, user.password);

        if(!passwordConfirmed) {
            throw new AppError('Invalid credentials.', 401);
        }

        return user;
    }
}

export default CreateSessionsService;