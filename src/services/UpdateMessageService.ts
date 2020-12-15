import { getRepository } from 'typeorm'

import { Message } from '../models/Message'

interface Request {
    messageId: string
    message: string
    created_at: Date
}

class UpdateMessageService {
    public async execute({ messageId, message, created_at }: Request): Promise<Message> {
        const messagesRepository = getRepository(Message)

        const messageUpdate = await messagesRepository.findOne(messageId)

        if(!messageUpdate) {
            throw new Error('Message not found with the provided id')
        }
        
        if(message) {
            messageUpdate.message = message
        }
        if(created_at) {
            messageUpdate.created_at = created_at
        }

        await messagesRepository.save(messageUpdate)

        return messageUpdate
    }
}

export default UpdateMessageService