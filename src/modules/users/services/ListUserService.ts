import {getCustomRepository} from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

class ListUserService {

    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.find();

        return user;

    }
}

export default ListUserService;