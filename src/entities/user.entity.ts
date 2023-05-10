import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        type: 'varchar'
    })
    name: string;

    @Column({
        nullable: false,
        type: 'varchar'
    })
    email: string;

    @Column({
        nullable: false,
        type: 'varchar'
    })
    password: string;
}