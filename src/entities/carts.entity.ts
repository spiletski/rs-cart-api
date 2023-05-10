import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CartItems } from './cart-items.entity';
import { User } from './user.entity';

@Entity('carts')
export class Carts {
    constructor(initialData: Partial<Carts> = null) {
        if (initialData !== null) {
            Object.assign(this, initialData);
        }
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @Column({
        type: 'uuid',
        nullable: false
    })
    user_id: string;

    @Column({
        type: 'timestamptz',
        nullable: false,
    })
    created_at: Date;

    @Column({
        type: 'timestamptz',
        nullable: false,
    })
    updated_at: Date;

    @Column({
        type: 'enum',
        enum: ["OPEN", "ORDERED"],
        nullable: false,
    })
    status: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User

    @OneToMany(() => CartItems, (cartItems) => cartItems.cart, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
    items: CartItems[]
}