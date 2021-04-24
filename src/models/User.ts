import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    name: string

    @Column()
    password: string

    @Column()
    picture: string

    @Column()
    status: string
}
