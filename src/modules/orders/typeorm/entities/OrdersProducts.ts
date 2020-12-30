import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Order from "./Order";
import Product from "../../../products/typeorm/entities/Product";

@Entity('orders_products')
class OrdersProducts {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({name: 'order_id'})
    order: Order;

    @ManyToOne(() => Product, product => product.order_products)
    @JoinColumn({name: 'product_id'})
    product: Product;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}

export default OrdersProducts;