import {getCustomRepository} from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";

class ListCustomerService {

    public async execute(): Promise<Customer[]> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customers = await customersRepository.find();

        return customers;

    }
}

export default ListCustomerService;