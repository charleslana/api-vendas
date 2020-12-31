import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Customer from "../../../customers/typeorm/entities/Customer";
import OrdersProducts from "./OrdersProducts";

@Entity('orders')
class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer)
    @JoinColumn({name: 'customer_id'})
    customer: Customer;

    @OneToMany(() => OrdersProducts, order_products => order_products.order, {
        cascade: true
    })
    order_products: OrdersProducts[];

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}

export default Order;