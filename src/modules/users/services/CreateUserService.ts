import {getCustomRepository} from "typeorm";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface InterfaceRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    public async execute({name, email, password}: InterfaceRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const emailExists = await usersRepository.findByEmail(email);

        if(emailExists) {
            throw new AppError('Email address already used.');
        }

        const user = usersRepository.create({
            name,
            email,
            password
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;