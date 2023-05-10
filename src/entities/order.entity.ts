import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Carts } from './carts.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({name: 'user_id'})
    user: User

    @ManyToOne(() => Carts, (cart) => cart.id)
    @JoinColumn({name: 'cart_id'})
    cart: Carts

    @Column({
        type: 'json',
        nullable: false
    })
    payment: string;

    @Column({
        type: 'json',
        nullable: false
    })
    delivery: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    comments: string;

    @Column({
        type: 'enum',
        enum: ["OPEN", "ORDERED"],
        nullable: false
    })
    status: string;

    @Column({
        type: 'int',
        nullable: false
    })
    total: number;
}