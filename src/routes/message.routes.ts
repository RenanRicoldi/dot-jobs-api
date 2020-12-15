import { Router } from 'express'
import { getRepository } from 'typeorm'
import { Message } from '../models/Message'
import CreateMessageService from '../services/CreateMessageService'
import UpdateMessageService from '../services/UpdateMessageService'

const messagesRouter = Router()

messagesRouter.get('/', async (request, response) => {
    const messageRepository = getRepository(Message)

    const messages = await messageRepository.find()

    return response.json(messages)
})

messagesRouter.get('/:id', async (request, response) => {
    const messageId = request.params.id
    const messageRepository = getRepository(Message)

    const messages = await messageRepository.findOne(messageId)

    return response.json(messages)
})

messagesRouter.post('/', async (request, response) => {
    const { service_id, interest_id, message, created_at } = request.body

    const createMessage = new CreateMessageService()

    const messageCreate = await createMessage.execute({
        service_id,
        interest_id,
        message,
        created_at
    })

    return response.status(201).json(messageCreate)
})

messagesRouter.put('/:id', async (request, response) => {
    const messageId = request.params.id
    const { message, created_at } = request.body

    const updateMessage = new UpdateMessageService()

    const messageUpdate = await updateMessage.execute({
        messageId,
        message,
        created_at
    })

    return response.json(messageUpdate)

})

messagesRouter.delete('/:id', async (request, response) => {
    const messageId = request.params.id

    const messageRepository = getRepository(Message)

    const message = await messageRepository.findOne(messageId)
    
    if(!message) {
        throw new Error('Message not found with the provided id')
    }

    await messageRepository.remove(message)

    return response.json({ status: 'success', message: 'Message deleted' })
})

export default messagesRouter