import { getRepository } from 'typeorm'

import { Message } from '../models/Message'

interface Request {
    service_id: string
    interest_id: string
    message: string
    created_at: Date
}

class CreateMessageService {
    public async execute({ service_id, interest_id, message, created_at }: Request): Promise<Message> {
        const messagesRepository = getRepository(Message)

        const messageCreate = messagesRepository.create({
            service_id,
            interest_id,
            message,
            created_at
        })

        await messagesRepository.save(messageCreate)

        return messageCreate
    }
}

export default CreateMessageService