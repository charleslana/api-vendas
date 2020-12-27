import {getCustomRepository} from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface InterfaceRequest {
    id: string;
}

class ShowCustomerService {

    public async execute({id}: InterfaceRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);

        if(!customer) {
            throw new AppError('Customer not found.');
        }

        return customer;

    }
}

export default ShowCustomerService;