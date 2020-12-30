import {EntityRepository, Repository} from 'typeorm';
import Order from "../entities/Order";
import Customer from "../../../customers/typeorm/entities/Customer";

interface InterfaceProduct {
    productId: string,
    price: number,
    quantity: number
}

interface InterfaceRequest {
    customer: Customer;
    products: InterfaceProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {

    public async findById(id: string): Promise<Order | undefined> {
        const order = this.findOne(id, {
            relations: ['order_products', 'customer']
        });

        return order;
    }

    public async createOrder({customer, products}: InterfaceRequest): Promise<Order> {
        const order = this.create({
            customer,
            order_products: products
        });

        await this.save(order);

        return order;
    }
}