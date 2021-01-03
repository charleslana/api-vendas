import {getCustomRepository} from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";

interface InterfacePaginateCustomer {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    data: Customer[];
}

class ListCustomerService {

    public async execute(): Promise<InterfacePaginateCustomer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customers = await customersRepository.createQueryBuilder().paginate();

        return customers as InterfacePaginateCustomer;

    }
}

export default ListCustomerService;