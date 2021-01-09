import {getCustomRepository} from "typeorm";
import {ProductsRepository} from "../typeorm/repositories/ProductsRepository";
import AppError from "../../../shared/errors/AppError";
import RedisCache from "../../../shared/cache/RedisCache";

interface InterfaceRequest {
    id: string
}

class DeleteProductService {

    public async execute({id}: InterfaceRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id);

        if(!product) {
            throw new AppError('Product not found.');
        }

        const redisCache = new RedisCache();

        await redisCache.invalidate('PRODUCT_LIST');

        await productsRepository.remove(product);

    }
}

export default DeleteProductService;