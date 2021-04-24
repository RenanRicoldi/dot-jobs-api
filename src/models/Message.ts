import {Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm'
import {Service} from './Service'
import {Interest} from './Interest'
import { User } from './User'

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    user_id: string

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column()
    interest_id: string

    @OneToOne(() => Interest)
    @JoinColumn({ name: 'interest_id' })
    interest: Interest

    @Column()
    message: string

    @CreateDateColumn()
    created_at: Date
}