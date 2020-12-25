import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}

export default User;