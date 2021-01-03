import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Exclude, Expose} from "class-transformer";

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Exclude({ toPlainOnly: true })
    @Column()
    password: string;

    @Exclude({ toPlainOnly: true })
    @Column()
    avatar: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Expose({name: 'avatar_url'})
    getAvatarUrl(): string | null {
        if(!this.avatar) {
            return null;
        }

        return `${process.env.APP_API_URL}/files/${this.avatar}`;
    }
}

export default User;