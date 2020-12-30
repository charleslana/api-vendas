import {Column, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";

@Entity('user_tokens')
class UserToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    user_id: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}

export default UserToken;