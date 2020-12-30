import {getCustomRepository} from "typeorm";
import {ProductsRepository} from "../typeorm/repositories/ProductsRepository";
import AppError from "../../../shared/errors/AppError";
import Product from "../typeorm/entities/Product";

interface InterfaceRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {

    public async execute({name, price, quantity}: InterfaceRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const productExists = await productsRepository.findByName(name);

        if(productExists) {
            throw new AppError('There is already one product with this name.');
        }

        const product = productsRepository.create({
            name,
            price,
            quantity
        });

        await productsRepository.save(product);

        return product;

    }
}

export default CreateProductService;