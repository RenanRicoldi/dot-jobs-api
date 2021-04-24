import { Router } from 'express'
import { getRepository } from 'typeorm'
import { Interest } from '../models/Interest'
import CreateInterestService from '../services/CreateInterestService'
import UpdateInterestService from '../services/UpdateInterestService'

const interestsRouter = Router()

interestsRouter.get('/', async (request, response) => {
    const interestRepository = getRepository(Interest)

    const interests = await interestRepository.find()

    return response.json(interests)
})

interestsRouter.get('/:id', async (request, response) => {
    const interestId = request.params.id
    const interestRepository = getRepository(Interest)

    const interests = await interestRepository.findOne(interestId)

    return response.json(interests)
})

interestsRouter.get('/byFreelancer/:freelancer_id', async (request, response) => {
    const {freelancer_id} = request.params
    const interestRepository = getRepository(Interest)

    const interests = await interestRepository.find({freelancer_id})

    return response.json(interests)
})

interestsRouter.get('/byService/:service_id', async (request, response) => {
    const {service_id} = request.params
    const interestRepository = getRepository(Interest)

    const interests = await interestRepository.find({service_id})

    return response.json(interests)
})

interestsRouter.post('/', async (request, response) => {
    const { service_id, freelancer_id, status } = request.body

    const createInterest = new CreateInterestService()

    const interest = await createInterest.execute({
        service_id,
        freelancer_id,
        status
    })

    return response.status(201).json(interest)
})

interestsRouter.put('/:id', async (request, response) => {
    const interestId = request.params.id
    const { service_id, freelancer_id, status } = request.body

    const updateInterest = new UpdateInterestService()

    const interest = await updateInterest.execute({
        interestId,
        service_id,
        freelancer_id,
        status
    })

    return response.json(interest)

})

interestsRouter.delete('/:id', async (request, response) => {
    const interestId = request.params.id

    const interestRepository = getRepository(Interest)

    const interest = await interestRepository.findOne(interestId)
    
    if(!interest) {
        throw new Error('Interest not found with the provided id')
    }

    await interestRepository.remove(interest)

    return response.json({ status: 'success', message: 'Interest deleted' })
})

export default interestsRouter