import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Carts } from './carts.entity';

@Entity('cart_items')
export class CartItems {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: false })
    cart_id: string;

    @Column({
        type: 'uuid',
        nullable: false
    })
    product_id: string;

    @ManyToOne(() => Carts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cart_id' })
    cart: Carts;

    @Column({
        type: 'int',
        nullable: false,
    })
    count: number;
}