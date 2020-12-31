import {getCustomRepository} from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import {OrdersRepository} from "../typeorm/repositories/OrdersRepository";
import CustomersRepository from "../../customers/typeorm/repositories/CustomersRepository";
import {ProductsRepository} from "../../products/typeorm/repositories/ProductsRepository";

interface InterfaceProducts {
    id: string;
    quantity: number;
}

interface InterfaceRequest {
    customerId: string;
    products: InterfaceProducts[];
}

class CreateOrderService {

    public async execute({customerId, products}: InterfaceRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);

        const customersRepository = getCustomRepository(CustomersRepository);

        const productsRepository = getCustomRepository(ProductsRepository);

        const customerExists = await customersRepository.findById(customerId);

        if(!customerExists) {
            throw new AppError('Could not find any costumer with the given id.');
        }

        const existsProducts = await productsRepository.findAllByIds(products);

        if(!existsProducts.length) {
            throw new AppError('Could not find any products with the given ids.');
        }

        const existsProductsIds = existsProducts.map((product) => product.id);

        const checkNonexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id)
        );

        if(checkNonexistentProducts.length) {
            throw new AppError(`Could not find product ${checkNonexistentProducts[0].id}.`);
        }

        const quantityAvailable = products.filter(
          product => existsProducts.filter(
              p => p.id === product.id
          )[0].quantity < product.quantity
        );

        if(quantityAvailable.length) {
            throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`);
        }

        const serializesProducts = products.map(
            product => ({
                product_id: product.id,
                quantity: product.quantity,
                price: existsProducts.filter(p => p.id === product.id)[0].price
            })
        );

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializesProducts
        });

        const {order_products} = order;

        const updatedProductQuantity = order_products.map(
            product => ({
                id: product.product_id,
                quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
            })
        );

        await productsRepository.save(updatedProductQuantity);

        return order;

    }
}

export default CreateOrderService;